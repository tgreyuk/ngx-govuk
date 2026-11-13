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
 * Directive to be added to native input elements.
 *
 * Use it inside `ngx-govuk-form-group` to add a label, hint and error message.
 *
 * @selector input[ngxGovukTextInput]
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

  /** Set by `ngx-govuk-form-group` when it has an error message. */
  hasError = signal(false);

  /**
   * The width of the input. Accepts any GOV.UK fixed or fluid width units.
   */
  inputWidth = input<InputWidth>();

  protected widthClass = computed(() => {
    const width = this.inputWidth();
    return width ? WIDTH_CLASSES[width] : '';
  });
}
