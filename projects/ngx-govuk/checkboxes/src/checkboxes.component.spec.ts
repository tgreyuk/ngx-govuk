import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { MockProvider } from 'ng-mocks';
import { NgxGovukCheckbox, NgxGovukCheckboxes } from './checkboxes.component';

@Component({
  imports: [NgxGovukCheckboxes, NgxGovukCheckbox, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ngx-govuk-checkboxes
        id="nationality-checkboxes"
        name="nationality"
        legend="What is your nationality?"
        [hint]="hint()"
        [errorMessage]="errorMessage()"
        [asPageHeading]="asPageHeading()"
        formGroupName="nationality"
      >
        <ngx-govuk-checkbox formControlName="british"
          >British</ngx-govuk-checkbox
        >
        <ngx-govuk-checkbox
          formControlName="irish"
          hint="Including Northern Ireland"
        >
          Irish
        </ngx-govuk-checkbox>
        <ngx-govuk-checkbox formControlName="other">Other</ngx-govuk-checkbox>
      </ngx-govuk-checkboxes>
    </form>

    <ngx-govuk-checkboxes legend="Terms">
      <ngx-govuk-checkbox [(checked)]="agreed">I agree</ngx-govuk-checkbox>
      <ngx-govuk-checkbox [disabled]="true">Locked</ngx-govuk-checkbox>
    </ngx-govuk-checkboxes>
  `,
})
class HostComponent {
  form = new FormGroup({
    nationality: new FormGroup({
      british: new FormControl(false),
      irish: new FormControl(true),
      other: new FormControl(false),
    }),
  });
  hint = signal<string | undefined>('Select all that apply');
  errorMessage = signal<string | null>(null);
  asPageHeading = signal(false);
  agreed = signal(false);
}

describe('NgxGovukCheckboxes', () => {
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
    host.errorMessage.set('Select your nationality');
    host.asPageHeading.set(true);
    fixture.detectChanges();
    expect($('#nationality-checkboxes')).toMatchSnapshot();
  });

  it('bases the ids on the name, as GOV.UK Frontend does', () => {
    const { $, input } = setup();
    expect(input('nationality').name).toBe('nationality');
    expect($('label[for="nationality-2"]').textContent?.trim()).toBe('Irish');
    expect(input('nationality-3')).not.toBeNull();
    expect(input('checkboxes-generated')).not.toBeNull();
    expect(input('checkboxes-generated-2')).not.toBeNull();
  });

  it('links checkbox hints to their input', () => {
    const { $, input } = setup();
    expect(input('nationality-2').getAttribute('aria-describedby')).toBe(
      'nationality-2-item-hint',
    );
    expect($('#nationality-2-item-hint').classList).toContain(
      'govuk-checkboxes__hint',
    );
  });

  it('makes each checkbox a boolean form control', () => {
    const { fixture, host, input } = setup();
    const group = host.form.controls.nationality;
    expect(input('nationality-2').checked).toBe(true);

    input('nationality').click();
    input('nationality-2').click();
    fixture.detectChanges();
    expect(group.value).toEqual({ british: true, irish: false, other: false });

    group.controls.other.setValue(true);
    fixture.detectChanges();
    expect(input('nationality-3').checked).toBe(true);

    input('nationality').dispatchEvent(new Event('blur'));
    expect(group.controls.british.touched).toBe(true);
  });

  it('binds both ways to a signal', () => {
    const { fixture, host, input } = setup();
    input('checkboxes-generated').click();
    fixture.detectChanges();
    expect(host.agreed()).toBe(true);
  });

  it('disables a checkbox, or the ones in a disabled form group', () => {
    const { fixture, host, input } = setup();
    expect(input('checkboxes-generated-2').disabled).toBe(true);

    host.form.controls.nationality.disable();
    fixture.detectChanges();
    expect(input('nationality').disabled).toBe(true);
    expect(input('nationality-3').disabled).toBe(true);
  });

  it('shows the error only when an error message is set', () => {
    const { fixture, host, $ } = setup();
    const fieldset = () => $('#nationality-checkboxes fieldset');
    expect($('#nationality-checkboxes .govuk-form-group--error')).toBeNull();
    expect(fieldset().getAttribute('aria-describedby')).toBe(
      'nationality-hint',
    );

    host.errorMessage.set('Select your nationality');
    fixture.detectChanges();
    expect($('#nationality-checkboxes .govuk-form-group').classList).toContain(
      'govuk-form-group--error',
    );
    expect(fieldset().getAttribute('aria-describedby')).toBe(
      'nationality-hint nationality-error',
    );
  });
});
