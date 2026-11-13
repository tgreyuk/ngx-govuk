import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';

/** A date as users typed it, one string for each part. */
export interface DateInputValue {
  day: string;
  month: string;
  year: string;
}

/** A part of the date: `day`, `month` or `year`. */
export type DateInputPart = keyof DateInputValue;

const EMPTY: DateInputValue = { day: '', month: '', year: '' };

const PARTS: { key: DateInputPart; label: string; width: 2 | 4 }[] = [
  { key: 'day', label: 'Day', width: 2 },
  { key: 'month', label: 'Month', width: 2 },
  { key: 'year', label: 'Year', width: 4 },
];

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
  asPageHeading = input<boolean>(false);

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
   * Only those fields show their error styles. When unset, all three do.
   */
  errorParts = input<DateInputPart[]>();

  /**
   * The base for the fields' `name` and `id`, such as `passport-issued`. When
   * unset, one is generated.
   */
  name = input<string>();

  /**
   * Tells browsers the date is the user's date of birth, so they can fill it
   * in.
   */
  dateOfBirth = input<boolean>(false);

  /**
   * The day, month and year as users typed them. Each is an empty string
   * until they type something.
   */
  value = model<DateInputValue>(EMPTY);

  private generatedName = inject(NgxGovukUtilsService).randomId('date');
  private onChange: (value: DateInputValue) => void = () => {};

  protected onTouched: () => void = () => {};
  protected disabled = signal(false);
  protected parts = PARTS;
  protected baseName = computed(() => this.name() ?? this.generatedName);
  protected hintId = computed(() => `${this.baseName()}-hint`);
  protected errorId = computed(() => `${this.baseName()}-error`);

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

  protected inputClasses(part: (typeof PARTS)[number]): string {
    const parts = this.errorParts();
    const hasError =
      !!this.errorMessage() && (!parts?.length || parts.includes(part.key));
    return [
      'govuk-input',
      'govuk-date-input__input',
      `govuk-input--width-${part.width}`,
      hasError ? 'govuk-input--error' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected update(part: DateInputPart, event: Event): void {
    const value = {
      ...this.value(),
      [part]: (event.target as HTMLInputElement).value,
    };
    this.value.set(value);
    this.onChange(value);
  }

  writeValue(value: DateInputValue | null): void {
    this.value.set({ ...EMPTY, ...value });
  }

  registerOnChange(fn: (value: DateInputValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
