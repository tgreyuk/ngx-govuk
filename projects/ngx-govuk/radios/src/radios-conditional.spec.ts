import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';
import {
  NgxGovukRadio,
  NgxGovukRadioConditional,
  NgxGovukRadios,
} from './radios.component';

@Component({
  imports: [
    NgxGovukRadios,
    NgxGovukRadio,
    NgxGovukRadioConditional,
    NgxGovukFormGroup,
    NgxGovukTextInput,
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form">
      <ngx-govuk-radios
        name="contact"
        legend="How would you like to be contacted?"
        formControlName="contact"
      >
        <ngx-govuk-radio value="email">
          Email
          <ngx-govuk-form-group *ngxGovukRadioConditional label="Email address">
            <input id="email" ngxGovukTextInput formControlName="email" />
          </ngx-govuk-form-group>
        </ngx-govuk-radio>
        <ngx-govuk-radio value="phone">
          Phone
          @if (phoneReveal()) {
            <ng-template ngxGovukRadioConditional>
              <p class="govuk-body">We'll call you.</p>
            </ng-template>
          }
        </ngx-govuk-radio>
        <ngx-govuk-radio value="post">Post</ngx-govuk-radio>
      </ngx-govuk-radios>
    </form>
  `,
})
class HostComponent {
  form = new FormGroup({
    contact: new FormControl<string | null>('phone'),
    email: new FormControl(''),
  });
  phoneReveal = signal(true);
}

function setup() {
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const $ = (selector: string) =>
    element.querySelector(selector) as HTMLElement;
  return { fixture, host: fixture.componentInstance, element, $ };
}

describe('NgxGovukRadioConditional', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().element).toMatchSnapshot();
  });

  it('puts the content straight after its option', () => {
    const { $ } = setup();
    const email = $('#conditional-contact');
    expect(email.previousElementSibling?.querySelector('input')?.id).toBe(
      'contact',
    );
    expect(email.parentElement?.classList).toContain('govuk-radios');
    expect($('#conditional-contact-2').previousElementSibling?.tagName).toBe(
      'NGX-GOVUK-RADIO',
    );
  });

  it('shows the content only while its option is selected', () => {
    const { fixture, host, $ } = setup();
    const hidden = (id: string) =>
      $(`#${id}`).classList.contains('govuk-radios__conditional--hidden');
    expect(hidden('conditional-contact')).toBe(true);
    expect(hidden('conditional-contact-2')).toBe(false);
    expect($('#contact').getAttribute('aria-controls')).toBe(
      'conditional-contact',
    );
    expect($('#contact').getAttribute('aria-expanded')).toBe('false');
    expect($('#contact-2').getAttribute('aria-expanded')).toBe('true');
    expect($('#contact-3').hasAttribute('aria-controls')).toBe(false);

    $('#contact').click();
    fixture.detectChanges();
    expect(host.form.value.contact).toBe('email');
    expect(hidden('conditional-contact')).toBe(false);
    expect(hidden('conditional-contact-2')).toBe(true);
    expect($('#contact').getAttribute('aria-expanded')).toBe('true');
  });

  it('connects form controls in the content to the form', () => {
    const { fixture, host, $ } = setup();
    const email = $('#email') as HTMLInputElement;
    email.value = 'name@example.com';
    email.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(host.form.value.email).toBe('name@example.com');
  });

  it('removes the content when the template goes', () => {
    const { fixture, host, $ } = setup();
    host.phoneReveal.set(false);
    fixture.detectChanges();
    expect($('#conditional-contact-2')).toBeNull();
    expect($('#contact-2').hasAttribute('aria-controls')).toBe(false);
  });
});
