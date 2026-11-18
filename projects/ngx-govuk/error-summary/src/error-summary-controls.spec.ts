import { Component, input, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukCheckbox, NgxGovukCheckboxes } from 'ngx-govuk/checkboxes';
import {
  NgxGovukDateInput,
  NgxGovukDateInputValue,
} from 'ngx-govuk/date-input';
import { NgxGovukRadio, NgxGovukRadios } from 'ngx-govuk/radios';
import { NgxGovukSelect } from 'ngx-govuk/select';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';
import {
  NgxGovukErrorSummary,
  NgxGovukErrorSummaryItem,
} from './error-summary.component';

/** A field in a component of its own, rendered after the summary. */
@Component({
  selector: 'ngx-govuk-test-email-field',
  imports: [ReactiveFormsModule, NgxGovukTextInput],
  template: `<label for="email">Email address</label>
    <input id="email" [formControl]="control()" ngxGovukTextInput />`,
})
class EmailFieldComponent {
  control = input.required<FormControl<string | null>>();
}

@Component({
  imports: [
    ReactiveFormsModule,
    NgxGovukErrorSummary,
    NgxGovukTextInput,
    NgxGovukTextarea,
    NgxGovukSelect,
    NgxGovukRadios,
    NgxGovukRadio,
    NgxGovukCheckboxes,
    NgxGovukCheckbox,
    NgxGovukDateInput,
    EmailFieldComponent,
  ],
  template: `<ngx-govuk-error-summary disableAutoFocus [errorList]="errors()" />
    <form [formGroup]="form">
      <label for="event-name">What is the name of the event?</label>
      <input id="event-name" formControlName="eventName" ngxGovukTextInput />
    </form>
    <label for="more-detail">More detail</label>
    <textarea
      id="more-detail"
      [formControl]="moreDetail"
      ngxGovukTextarea
    ></textarea>
    <label for="sort">Sort by</label>
    <select id="sort" [formControl]="sort" ngxGovukSelect>
      <option value="updated">Recently updated</option>
    </select>
    <ngx-govuk-radios
      name="where-do-you-live"
      legend="Where do you live?"
      [formControl]="whereDoYouLive"
    >
      <ngx-govuk-radio value="england">England</ngx-govuk-radio>
      <ngx-govuk-radio value="wales">Wales</ngx-govuk-radio>
    </ngx-govuk-radios>
    <ngx-govuk-checkboxes name="waste" legend="Which types of waste?">
      <ngx-govuk-checkbox [formControl]="animal"
        >Animal carcasses</ngx-govuk-checkbox
      >
      <ngx-govuk-checkbox [formControl]="mines"
        >Mines or quarries</ngx-govuk-checkbox
      >
    </ngx-govuk-checkboxes>
    <ngx-govuk-date-input
      name="passport-issued"
      legend="When was your passport issued?"
      [errorParts]="['year']"
      [formControl]="passportIssued"
    />
    @if (showEmail()) {
      <ngx-govuk-test-email-field [control]="email" />
    }`,
})
class TestHostComponent {
  form = new FormGroup({ eventName: new FormControl('') });
  moreDetail = new FormControl('');
  sort = new FormControl('updated');
  whereDoYouLive = new FormControl<string | null>(null);
  animal = new FormControl(false);
  mines = new FormControl(false);
  passportIssued = new FormControl<NgxGovukDateInputValue | null>(null);
  email = new FormControl('');
  notOnPage = new FormControl('');
  showEmail = signal(true);
  errors = signal<NgxGovukErrorSummaryItem[]>([]);
}

describe('NgxGovukErrorSummary with form controls', () => {
  async function setup(errors: (host: TestHostComponent) => object[]) {
    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    host.errors.set(errors(host).map((item) => ({ text: 'Error', ...item })));
    fixture.detectChanges();
    await fixture.whenStable();
    const links = () =>
      Array.from(
        fixture.nativeElement.querySelectorAll(
          '.govuk-error-summary__list li',
        ) as NodeListOf<HTMLElement>,
      ).map((li) => li.querySelector('a')?.getAttribute('href') ?? null);
    return { fixture, host, links };
  }

  it('links to each kind of field by its form control', async () => {
    const { links } = await setup((host) => [
      { control: host.form.controls.eventName },
      { control: host.moreDetail },
      { control: host.sort },
      { control: host.whereDoYouLive },
      { control: host.mines },
      { control: host.passportIssued },
    ]);
    expect(links().map((href) => href?.replace(/.*#/, '#'))).toEqual([
      '#event-name',
      '#more-detail',
      '#sort',
      '#where-do-you-live',
      '#waste-2',
      '#passport-issued-year',
    ]);
  });

  it('links to a field in a component rendered after it', async () => {
    const { links } = await setup((host) => [{ control: host.email }]);
    expect(links()[0]).toMatch(/#email$/);
  });

  it('focuses the field when the error is selected', async () => {
    const { fixture } = await setup((host) => [
      { control: host.form.controls.eventName },
    ]);
    const $ = (selector: string) =>
      fixture.nativeElement.querySelector(selector) as HTMLElement;
    $('label[for="event-name"]').scrollIntoView = vi.fn();

    $('.govuk-error-summary__list a').click();

    expect(document.activeElement).toBe($('#event-name'));
  });

  it('shows the error without a link when its field is not on the page', async () => {
    const { fixture, host, links } = await setup((host) => [
      { control: host.notOnPage },
      { control: host.email },
    ]);
    expect(links()[0]).toBeNull();

    host.showEmail.set(false);
    fixture.detectChanges();
    expect(links()[1]).toBeNull();
  });

  it('prefers fieldId to control', async () => {
    const { links } = await setup((host) => [
      { control: host.moreDetail, fieldId: 'event-name' },
    ]);
    expect(links()[0]).toMatch(/#event-name$/);
  });
});
