import { InjectionToken, Signal } from '@angular/core';

/** What a panel needs from the accordion it's in. Not part of the public API. */
export interface NgxGovukAccordionContext {
  headingLevel: Signal<1 | 2 | 3 | 4 | 5 | 6>;
}

/**
 * Provided by `ngx-govuk-accordion` so its panels can read its settings
 * without importing it, which would make the two files import each other.
 */
export const NGX_GOVUK_ACCORDION = new InjectionToken<NgxGovukAccordionContext>(
  'NGX_GOVUK_ACCORDION',
);
