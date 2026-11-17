import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukErrorMessage } from './error-message.component';

@Component({
  imports: [NgxGovukErrorMessage],
  template: `<p
    ngxGovukErrorMessage
    id="full-name-error"
    [visuallyHiddenText]="visuallyHiddenText()"
  >
    Enter your full name
  </p>`,
})
class TestHostComponent {
  visuallyHiddenText = signal('Error');
}

function setup() {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const error = (fixture.nativeElement as HTMLElement).querySelector(
    'p',
  ) as HTMLElement;
  return { fixture, host: fixture.componentInstance, error };
}

describe('NgxGovukErrorMessage', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().error).toMatchSnapshot();
  });

  it('separates the visually hidden prefix from the message', () => {
    const { error } = setup();
    expect(error.querySelector('.govuk-visually-hidden')?.textContent).toBe(
      'Error:',
    );
    expect(error.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Error: Enter your full name',
    );
  });

  it('translates or leaves out the visually hidden prefix', () => {
    const { fixture, host, error } = setup();
    host.visuallyHiddenText.set('Gwall');
    fixture.detectChanges();
    expect(error.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Gwall: Enter your full name',
    );

    host.visuallyHiddenText.set('');
    fixture.detectChanges();
    expect(error.querySelector('.govuk-visually-hidden')).toBeNull();
    expect(error.textContent?.trim()).toBe('Enter your full name');
  });
});
