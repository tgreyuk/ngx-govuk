import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';
import { MockProvider } from 'ng-mocks';
import { NgxGovukFormGroup } from './form-group.component';

@Component({
  imports: [NgxGovukFormGroup, NgxGovukTextInput, NgxGovukTextarea],
  template: `
    <ngx-govuk-form-group
      label="Email address"
      [hint]="hint()"
      [errorMessage]="errorMessage()"
      [asPageHeading]="asPageHeading()"
      [labelSize]="labelSize()"
      [prefix]="prefix()"
    >
      <input id="email" ngxGovukTextInput autocomplete="email" />
    </ngx-govuk-form-group>

    <ngx-govuk-form-group label="No id" [errorMessage]="errorMessage()">
      <textarea ngxGovukTextarea aria-describedby="own-help"></textarea>
    </ngx-govuk-form-group>
  `,
})
class HostComponent {
  hint = signal<string | undefined>('Use your work email');
  errorMessage = signal<string | null>(null);
  asPageHeading = signal(false);
  labelSize = signal<'s' | 'm' | 'l' | 'xl' | undefined>(undefined);
  prefix = signal<string | undefined>(undefined);
}

describe('NgxGovukFormGroup', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let element: HTMLElement;

  const $ = (selector: string) => element.querySelector(selector);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        MockProvider(NgxGovukUtilsService, {
          randomId: (prefix: string) => `${prefix}-generated`,
        }),
      ],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('matches the GOV.UK markup snapshot', () => {
    host.errorMessage.set('Enter an email address');
    fixture.detectChanges();
    expect($('ngx-govuk-form-group')).toMatchSnapshot();
  });

  it("keeps the field's own id and derives the hint id from it", () => {
    expect($('input')?.id).toBe('email');
    expect($('label')?.getAttribute('for')).toBe('email');
    expect($('.govuk-hint')?.id).toBe('email-hint');
    expect($('input')?.getAttribute('aria-describedby')).toBe('email-hint');
  });

  it('keeps native attributes on the field', () => {
    expect($('input')?.getAttribute('autocomplete')).toBe('email');
  });

  it('leaves out aria-describedby when there is no hint or error', () => {
    host.hint.set(undefined);
    fixture.detectChanges();
    expect($('input')?.hasAttribute('aria-describedby')).toBe(false);
  });

  it('shows the error only when an error message is set', () => {
    expect($('.govuk-form-group--error')).toBeNull();
    expect($('.govuk-error-message')).toBeNull();
    expect($('input')?.classList).not.toContain('govuk-input--error');

    host.errorMessage.set('Enter an email address');
    fixture.detectChanges();

    expect($('.govuk-form-group')?.classList).toContain(
      'govuk-form-group--error',
    );
    const error = $('#email-error');
    expect(error?.classList).toContain('govuk-error-message');
    expect(error?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Error: Enter an email address',
    );
    expect($('#email-error .govuk-visually-hidden')?.textContent).toBe(
      'Error:',
    );
    expect($('input')?.classList).toContain('govuk-input--error');
    expect($('input')?.getAttribute('aria-describedby')).toBe(
      'email-hint email-error',
    );

    host.errorMessage.set(null);
    fixture.detectChanges();
    expect($('.govuk-form-group--error')).toBeNull();
    expect($('input')?.classList).not.toContain('govuk-input--error');
    expect($('input')?.getAttribute('aria-describedby')).toBe('email-hint');
  });

  it('generates an id when the field has none, and keeps existing aria-describedby', () => {
    const textarea = $('textarea');
    expect(textarea?.id).toBe('field-generated');
    expect(textarea?.getAttribute('aria-describedby')).toBe('own-help');

    host.errorMessage.set('Enter a description');
    fixture.detectChanges();
    expect(textarea?.classList).toContain('govuk-textarea--error');
    expect(textarea?.getAttribute('aria-describedby')).toBe(
      'own-help field-generated-error',
    );
  });

  it('renders the label as the page heading, large by default', () => {
    host.asPageHeading.set(true);
    fixture.detectChanges();
    const label = $('h1.govuk-label-wrapper > label');
    expect(label?.className).toBe('govuk-label govuk-label--l');
  });

  it('applies a label size', () => {
    host.labelSize.set('m');
    fixture.detectChanges();
    expect($('label')?.className).toBe('govuk-label govuk-label--m');
  });

  it('only wraps the field when there is a prefix or suffix', () => {
    expect($('.govuk-input__wrapper')).toBeNull();
    host.prefix.set('£');
    fixture.detectChanges();
    expect(
      $('.govuk-input__wrapper > .govuk-input__prefix')?.textContent?.trim(),
    ).toBe('£');
    expect($('.govuk-input__wrapper > input#email')).not.toBeNull();
  });
});
