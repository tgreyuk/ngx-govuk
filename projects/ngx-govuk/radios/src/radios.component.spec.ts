import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { MockProvider } from 'ng-mocks';
import { NgxGovukRadio, NgxGovukRadios } from './radios.component';

@Component({
  imports: [NgxGovukRadios, NgxGovukRadio, ReactiveFormsModule],
  template: `
    <ngx-govuk-radios
      id="contact-radios"
      name="contact"
      legend="How would you like to be contacted?"
      [hint]="hint()"
      [errorMessage]="errorMessage()"
      [asPageHeading]="asPageHeading()"
      [inline]="inline()"
      [formControl]="control"
    >
      <ngx-govuk-radio value="email">Email</ngx-govuk-radio>
      <ngx-govuk-radio value="phone" hint="We'll call in office hours">
        Phone
      </ngx-govuk-radio>
      <ngx-govuk-radio value="post" [disabled]="true">Post</ngx-govuk-radio>
    </ngx-govuk-radios>

    <ngx-govuk-radios id="unnamed" legend="Unnamed" [(value)]="choice">
      <ngx-govuk-radio value="yes">Yes</ngx-govuk-radio>
      <ngx-govuk-radio value="no">No</ngx-govuk-radio>
    </ngx-govuk-radios>
  `,
})
class HostComponent {
  control = new FormControl<string | null>(null);
  hint = signal<string | undefined>('Select one option');
  errorMessage = signal<string | null>(null);
  asPageHeading = signal(false);
  inline = signal(false);
  choice = signal<string | null>('no');
}

describe('NgxGovukRadios', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(NgxGovukUtilsService, {
          randomId: (prefix: string) => `${prefix}-generated`,
        }),
      ],
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const $ = (selector: string) =>
      element.querySelector(selector) as HTMLElement;
    const input = (id: string) => $(`#${id}`) as HTMLInputElement;
    return { fixture, host: fixture.componentInstance, $, input };
  }

  it('matches the GOV.UK markup snapshot', () => {
    const { fixture, host, $ } = setup();
    host.errorMessage.set('Select how you would like to be contacted');
    host.asPageHeading.set(true);
    fixture.detectChanges();
    expect($('#contact-radios')).toMatchSnapshot();
  });

  it('bases the ids on the name, as GOV.UK Frontend does', () => {
    const { $, input } = setup();
    expect(input('contact').value).toBe('email');
    expect(input('contact-2').value).toBe('phone');
    expect(input('contact-3').value).toBe('post');
    expect(input('contact').name).toBe('contact');
    expect($('label[for="contact-2"]').textContent?.trim()).toBe('Phone');
    expect($('#contact-hint').textContent).toBe('Select one option');
  });

  it('generates a name when none is set', () => {
    const { input } = setup();
    expect(input('radios-generated').value).toBe('yes');
    expect(input('radios-generated-2').name).toBe('radios-generated');
  });

  it('links option hints to their input', () => {
    const { $, input } = setup();
    expect(input('contact-2').getAttribute('aria-describedby')).toBe(
      'contact-2-item-hint',
    );
    expect($('#contact-2-item-hint').classList).toContain('govuk-radios__hint');
    expect(input('contact').hasAttribute('aria-describedby')).toBe(false);
  });

  it('reads and writes the form control', () => {
    const { fixture, host, input } = setup();
    host.control.setValue('phone');
    fixture.detectChanges();
    expect(input('contact-2').checked).toBe(true);
    expect(input('contact').checked).toBe(false);

    input('contact').click();
    fixture.detectChanges();
    expect(host.control.value).toBe('email');
    expect(input('contact-2').checked).toBe(false);

    input('contact').dispatchEvent(new Event('blur'));
    expect(host.control.touched).toBe(true);
  });

  it('binds both ways to a signal', () => {
    const { fixture, host, input } = setup();
    expect(input('radios-generated-2').checked).toBe(true);

    input('radios-generated').click();
    fixture.detectChanges();
    expect(host.choice()).toBe('yes');
  });

  it('disables one option, or all of them with the form control', () => {
    const { fixture, host, input } = setup();
    expect(input('contact-3').disabled).toBe(true);
    expect(input('contact').disabled).toBe(false);

    host.control.disable();
    fixture.detectChanges();
    expect(input('contact').disabled).toBe(true);
    expect(input('contact-2').disabled).toBe(true);
  });

  it('shows the error only when an error message is set', () => {
    const { fixture, host, $ } = setup();
    const fieldset = () => $('#contact-radios fieldset');
    expect($('#contact-radios .govuk-form-group--error')).toBeNull();
    expect(fieldset().getAttribute('aria-describedby')).toBe('contact-hint');

    host.errorMessage.set('Select how you would like to be contacted');
    fixture.detectChanges();
    expect($('#contact-radios .govuk-form-group').classList).toContain(
      'govuk-form-group--error',
    );
    expect($('#contact-error').textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Error: Select how you would like to be contacted',
    );
    expect(fieldset().getAttribute('aria-describedby')).toBe(
      'contact-hint contact-error',
    );

    host.hint.set(undefined);
    host.errorMessage.set(null);
    fixture.detectChanges();
    expect(fieldset().hasAttribute('aria-describedby')).toBe(false);
  });

  it('shows the options inline', () => {
    const { fixture, host, $ } = setup();
    host.inline.set(true);
    fixture.detectChanges();
    expect($('#contact-radios .govuk-radios').classList).toContain(
      'govuk-radios--inline',
    );
  });
});
