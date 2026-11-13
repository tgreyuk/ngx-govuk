import {
  Directive,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { InputWidth, NGX_GOVUK_FIELD, NgxGovukField } from 'ngx-govuk';

const WIDTH_CLASSES: Record<InputWidth, string> = {
  '2': 'govuk-input--width-2',
  '3': 'govuk-input--width-3',
  '4': 'govuk-input--width-4',
  '5': 'govuk-input--width-5',
  '10': 'govuk-input--width-10',
  '20': 'govuk-input--width-20',
  '30': 'govuk-input--width-30',
  full: 'govuk-!-width-full',
  'three-quarters': 'govuk-!-width-three-quarters',
  'two-thirds': 'govuk-!-width-two-thirds',
  'one-half': 'govuk-!-width-one-half',
  'one-third': 'govuk-!-width-one-third',
  'one-quarter': 'govuk-!-width-one-quarter',
};

/**
 * Styles an `input` element as a GOV.UK text input.
 *
 * Put it inside `ngx-govuk-form-group`, which adds its label, hint and error
 * message.
 */
@Directive({
  selector: 'input[ngxGovukTextInput]',
  host: {
    class: 'govuk-input',
    '[class]': 'widthClass()',
    '[class.govuk-input--error]': 'hasError()',
  },
  providers: [
    {
      provide: NGX_GOVUK_FIELD,
      useExisting: forwardRef(() => NgxGovukTextInput),
    },
  ],
})
export class NgxGovukTextInput implements NgxGovukField {
  elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /**
   * Set by `ngx-govuk-form-group` when it has an error message.
   *
   * @internal
   */
  hasError = signal(false);

  /**
   * The input's width. Use a number of characters, such as `10`, when you know
   * how long the answer will be, or a fraction, such as `one-half`, for a width
   * relative to the input's container.
   */
  inputWidth = input<InputWidth>();

  protected widthClass = computed(() => {
    const width = this.inputWidth();
    return width ? WIDTH_CLASSES[width] : '';
  });
}
