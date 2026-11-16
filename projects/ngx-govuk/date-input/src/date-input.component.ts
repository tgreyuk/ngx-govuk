import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
  booleanAttribute,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';

/** A date as users typed it, one string for each part. */
export interface NgxGovukDateInputValue {
  /**
   * The day, such as `27`. Empty when the field is empty or not shown.
   */
  day: string;
  /**
   * The month, such as `3`. Empty when the field is empty or not shown.
   */
  month: string;
  /**
   * The year, such as `2007`. Empty when the field is empty or not shown.
   */
  year: string;
}

/** A part of the date: `day`, `month` or `year`. */
export type NgxGovukDateInputPart = 'day' | 'month' | 'year';

const EMPTY: NgxGovukDateInputValue = { day: '', month: '', year: '' };

const ALL_PARTS: NgxGovukDateInputPart[] = ['day', 'month', 'year'];

/**
 * Helps users enter a date they know or can find easily, such as their date
 * of birth.
 *
 * Bind it to a form control with `formControlName`, `[formControl]` or
 * `[(ngModel)]`, or to a signal with `[(value)]`. Its value has the day, month
 * and year as users typed them, so you can check each part and say which one
 * is wrong, as GOV.UK recommends. It adds the fieldset, legend, hint and error
 * message.
 *
 * The fields' ids are `<name>-day`, `<name>-month` and `<name>-year`. Link an
 * error summary to the first field with an error.
 */
@Component({
  selector: 'ngx-govuk-date-input',
  templateUrl: './date-input.component.html',
  host: {
    class: 'govuk-form-group',
    '[class.govuk-form-group--error]': '!!errorMessage()',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':host(:not([hidden])) { display: block; }',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxGovukDateInput),
      multi: true,
    },
  ],
})
export class NgxGovukDateInput implements ControlValueAccessor {
  /**
   * The legend, which asks the question.
   */
  legend = input.required<string>();

  /**
   * The legend's size. When unset, the legend is `l` if it's the page heading,
   * and body size otherwise.
   */
  legendSize = input<'s' | 'm' | 'l' | 'xl'>();

  /**
   * Makes the legend the page heading. Use it when the page asks just one
   * question.
   */
  asPageHeading = input(false, { transform: booleanAttribute });

  /**
   * Hint text, such as `For example, 27 3 2007`.
   */
  hint = input<string>();

  /**
   * The error message. When it's set, the date input shows its error styles.
   * Set it when validation fails, such as after the form is submitted.
   */
  errorMessage = input<string | null>();

  /**
   * The parts of the date the error message is about, such as `['year']`.
   * Only those fields show their error styles. When unset, all of them do.
   */
  errorParts = input<NgxGovukDateInputPart[]>();

  /**
   * The parts of the date to ask for, such as `['month', 'year']` for a card's
   * expiry date. They're always shown in the order day, month, year. The
   * value keeps an empty string for each part that isn't shown.
   */
  parts = input<NgxGovukDateInputPart[]>(['day', 'month', 'year']);

  /**
   * The day field's label, such as `Diwrnod` in Welsh.
   */
  dayLabel = input('Day');

  /**
   * The month field's label, such as `Mis` in Welsh.
   */
  monthLabel = input('Month');

  /**
   * The year field's label, such as `Blwyddyn` in Welsh.
   */
  yearLabel = input('Year');

  /**
   * The base for the fields' `name` and `id`, such as `passport-issued`. When
   * unset, one is generated.
   */
  name = input<string>();

  /**
   * Tells browsers the date is the user's date of birth, so they can fill it
   * in.
   */
  dateOfBirth = input(false, { transform: booleanAttribute });

  /**
   * The date as users typed it: an object with a `day`, `month` and `year`
   * string, such as `{ day: '27', month: '3', year: '2007' }`. Each part is an
   * empty string until users type in it, and isn't checked or converted, so
   * `'3'`, `'03'` and `'March'` all come through as typed.
   */
  value = model<NgxGovukDateInputValue>({ day: '', month: '', year: '' });

  private generatedName = inject(NgxGovukUtilsService).randomId('date');
  private onChange: (value: NgxGovukDateInputValue) => void = () => {};
  private onTouched: () => void = () => {};

  protected disabled = signal(false);
  protected baseName = computed(() => this.name() ?? this.generatedName);
  protected hintId = computed(() => `${this.baseName()}-hint`);
  protected errorId = computed(() => `${this.baseName()}-error`);

  protected fields = computed(() => {
    const labels = {
      day: this.dayLabel(),
      month: this.monthLabel(),
      year: this.yearLabel(),
    };
    const shown = this.parts();
    return ALL_PARTS.filter((part) => shown.includes(part)).map((part) => ({
      key: part,
      id: `${this.baseName()}-${part}`,
      label: labels[part],
      width: part === 'year' ? 4 : 2,
    }));
  });

  protected describedBy = computed(
    () =>
      [
        this.hint() ? this.hintId() : '',
        this.errorMessage() ? this.errorId() : '',
      ]
        .filter(Boolean)
        .join(' ') || null,
  );

  protected legendClasses = computed(() => {
    const size = this.legendSize() ?? (this.asPageHeading() ? 'l' : undefined);
    return size
      ? `govuk-fieldset__legend govuk-fieldset__legend--${size}`
      : 'govuk-fieldset__legend';
  });

  protected inputClasses(part: NgxGovukDateInputPart, width: number): string {
    const parts = this.errorParts();
    const hasError =
      !!this.errorMessage() && (!parts?.length || parts.includes(part));
    return [
      'govuk-input',
      'govuk-date-input__input',
      `govuk-input--width-${width}`,
      hasError ? 'govuk-input--error' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected update(part: NgxGovukDateInputPart, event: Event): void {
    const value = {
      ...this.value(),
      [part]: (event.target as HTMLInputElement).value,
    };
    this.value.set(value);
    this.onChange(value);
  }

  /**
   * Marks the form control touched only when focus leaves all the fields, not
   * when users move from one field to the next.
   */
  protected focusOut(event: FocusEvent): void {
    const container = event.currentTarget as HTMLElement;
    const next = event.relatedTarget as Node | null;
    if (!next || !container.contains(next)) {
      this.onTouched();
    }
  }

  writeValue(value: NgxGovukDateInputValue | null): void {
    this.value.set({ ...EMPTY, ...value });
  }

  registerOnChange(fn: (value: NgxGovukDateInputValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
