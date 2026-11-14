import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';
import { NgxGovukPasswordInput } from './password-input.component';

@Component({
  imports: [NgxGovukPasswordInput, NgxGovukTextInput],
  template: `<form (submit)="$event.preventDefault()">
    <ngx-govuk-password-input
      label="Password"
      [hint]="hint()"
      [errorMessage]="errorMessage()"
    >
      <input id="password" name="password" ngxGovukTextInput />
    </ngx-govuk-password-input>
    <ngx-govuk-password-input label="New password">
      <input id="new-password" autocomplete="new-password" ngxGovukTextInput />
    </ngx-govuk-password-input>
  </form>`,
})
class TestHostComponent {
  hint = signal<string | undefined>(undefined);
  errorMessage = signal<string | null>(null);
}

function setup() {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const $ = (selector: string) =>
    element.querySelector(selector) as HTMLElement;
  const input = $('#password') as HTMLInputElement;
  const button = $('.govuk-password-input__toggle') as HTMLButtonElement;
  const status = $('.govuk-password-input__sr-status');
  const click = () => {
    button.click();
    fixture.detectChanges();
  };
  return { fixture, element, $, input, button, status, click };
}

describe('NgxGovukPasswordInput', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().$('ngx-govuk-password-input')).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot with a hint and error', () => {
    const { fixture, $ } = setup();
    fixture.componentInstance.hint.set('It must be at least 8 characters');
    fixture.componentInstance.errorMessage.set('Enter a password');
    fixture.detectChanges();
    expect($('ngx-govuk-password-input')).toMatchSnapshot();
  });

  it('keeps the input’s own autocomplete', () => {
    const { $ } = setup();
    expect($('#new-password').getAttribute('autocomplete')).toBe(
      'new-password',
    );
  });

  it('shows and hides the password, and tells screen readers', () => {
    const { input, button, status, click } = setup();
    expect(status.textContent?.trim()).toBe('');

    click();
    expect(input.type).toBe('text');
    expect(button.textContent?.trim()).toBe('Hide');
    expect(button.getAttribute('aria-label')).toBe('Hide password');
    expect(status.textContent?.trim()).toBe('Your password is visible');

    click();
    expect(input.type).toBe('password');
    expect(button.textContent?.trim()).toBe('Show');
    expect(status.textContent?.trim()).toBe('Your password is hidden');
  });

  it('hides the password when the form is submitted', () => {
    const { element, input, click } = setup();
    click();
    element
      .querySelector('form')!
      .dispatchEvent(new Event('submit', { cancelable: true }));
    expect(input.type).toBe('password');
  });
});
