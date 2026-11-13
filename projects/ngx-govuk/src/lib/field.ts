import { ElementRef, InjectionToken, WritableSignal } from '@angular/core';

/**
 * A form field directive that `NgxGovukFormGroup` can wire up, such as
 * `NgxGovukTextInput` or `NgxGovukTextarea`.
 *
 * Field directives provide themselves under `NGX_GOVUK_FIELD`, so the form
 * group can find any field without depending on each one.
 */
export interface NgxGovukField {
  /** The native form element. */
  elementRef: ElementRef<HTMLElement>;
  /** Set by the form group when it has an error message. */
  hasError: WritableSignal<boolean>;
}

export const NGX_GOVUK_FIELD = new InjectionToken<NgxGovukField>(
  'NGX_GOVUK_FIELD',
);
