import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { MockProvider } from 'ng-mocks';
import {
  DateInputPart,
  DateInputValue,
  NgxGovukDateInput,
} from './date-input.component';

@Component({
  imports: [NgxGovukDateInput, ReactiveFormsModule],
  template: `
    <ngx-govuk-date-input
      id="issued"
      name="passport-issued"
      legend="When was your passport issued?"
      hint="For example, 27 3 2007"
      [errorMessage]="errorMessage()"
      [errorParts]="errorParts()"
      [asPageHeading]="asPageHeading()"
      [formControl]="control"
    />

    <ngx-govuk-date-input
      id="birth"
      legend="What is your date of birth?"
      [dateOfBirth]="true"
      [(value)]="birthday"
    />
  `,
})
class HostComponent {
  control = new FormControl<DateInputValue | null>(null);
  errorMessage = signal<string | null>(null);
  errorParts = signal<DateInputPart[] | undefined>(undefined);
  asPageHeading = signal(false);
  birthday = signal<DateInputValue>({ day: '1', month: '2', year: '1990' });
}

describe('NgxGovukDateInput', () => {
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
    const type = (id: string, text: string) => {
      input(id).value = text;
      input(id).dispatchEvent(new Event('input'));
      fixture.detectChanges();
    };
    return { fixture, host: fixture.componentInstance, $, input, type };
  }

  it('matches the GOV.UK markup snapshot', () => {
    const { fixture, host, $ } = setup();
    host.errorMessage.set(
      'The date your passport was issued must be in the past',
    );
    host.asPageHeading.set(true);
    fixture.detectChanges();
    expect($('#issued')).toMatchSnapshot();
  });

  it('bases the ids and names on the name, as GOV.UK Frontend does', () => {
    const { $, input } = setup();
    expect($('.govuk-date-input').id).toBe('passport-issued');
    expect(input('passport-issued-day').name).toBe('passport-issued-day');
    expect(input('passport-issued-month').classList).toContain(
      'govuk-input--width-2',
    );
    expect(input('passport-issued-year').classList).toContain(
      'govuk-input--width-4',
    );
    expect($('label[for="passport-issued-year"]').textContent?.trim()).toBe(
      'Year',
    );
    expect($('#issued fieldset').getAttribute('aria-describedby')).toBe(
      'passport-issued-hint',
    );
    expect(input('date-generated-day')).not.toBeNull();
  });

  it('sets date of birth autocomplete only when asked', () => {
    const { input } = setup();
    expect(input('date-generated-day').getAttribute('autocomplete')).toBe(
      'bday-day',
    );
    expect(input('date-generated-year').getAttribute('autocomplete')).toBe(
      'bday-year',
    );
    expect(input('passport-issued-day').hasAttribute('autocomplete')).toBe(
      false,
    );
  });

  it('reads and writes the form control, part by part', () => {
    const { fixture, host, input, type } = setup();
    host.control.setValue({ day: '27', month: '3', year: '2007' });
    fixture.detectChanges();
    expect(input('passport-issued-day').value).toBe('27');
    expect(input('passport-issued-year').value).toBe('2007');

    type('passport-issued-month', '4');
    expect(host.control.value).toEqual({ day: '27', month: '4', year: '2007' });

    host.control.setValue(null);
    fixture.detectChanges();
    expect(input('passport-issued-day').value).toBe('');

    input('passport-issued-day').dispatchEvent(new Event('blur'));
    expect(host.control.touched).toBe(true);
  });

  it('binds both ways to a signal', () => {
    const { host, input, type } = setup();
    expect(input('date-generated-month').value).toBe('2');
    type('date-generated-year', '1991');
    expect(host.birthday()).toEqual({ day: '1', month: '2', year: '1991' });
  });

  it('disables the fields with the form control', () => {
    const { fixture, host, input } = setup();
    host.control.disable();
    fixture.detectChanges();
    expect(input('passport-issued-day').disabled).toBe(true);
    expect(input('passport-issued-year').disabled).toBe(true);
  });

  it('shows the error on all fields, or only the parts it is about', () => {
    const { fixture, host, $, input } = setup();
    const errorFields = () =>
      ['day', 'month', 'year'].filter((part) =>
        input(`passport-issued-${part}`).classList.contains(
          'govuk-input--error',
        ),
      );
    expect(errorFields()).toEqual([]);
    expect($('#issued .govuk-form-group--error')).toBeNull();

    host.errorMessage.set('Enter a real date');
    fixture.detectChanges();
    expect(errorFields()).toEqual(['day', 'month', 'year']);
    expect($('#issued .govuk-form-group').classList).toContain(
      'govuk-form-group--error',
    );
    expect($('#issued fieldset').getAttribute('aria-describedby')).toBe(
      'passport-issued-hint passport-issued-error',
    );

    host.errorParts.set(['year']);
    fixture.detectChanges();
    expect(errorFields()).toEqual(['year']);
  });
});
