import {
  Directive,
  ElementRef,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { NGX_GOVUK_FIELD, NgxGovukField } from 'ngx-govuk';

/**
 * Styles a `select` element as a GOV.UK select, to let users choose an
 * option from a long list.
 *
 * Put it inside `ngx-govuk-form-group`, which adds its label, hint and error
 * message, and add its options as `option` elements.
 */
@Directive({
  selector: 'select[ngxGovukSelect]',
  host: {
    class: 'govuk-select',
    '[class.govuk-select--error]': 'hasError()',
  },
  providers: [
    {
      provide: NGX_GOVUK_FIELD,
      useExisting: forwardRef(() => NgxGovukSelect),
    },
  ],
})
export class NgxGovukSelect implements NgxGovukField {
  /** @internal */
  elementRef = inject<ElementRef<HTMLSelectElement>>(ElementRef);

  /**
   * Set by `ngx-govuk-form-group` when it has an error message.
   *
   * @internal
   */
  hasError = signal(false);
}
