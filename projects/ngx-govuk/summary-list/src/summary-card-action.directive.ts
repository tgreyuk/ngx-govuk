import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Marks a link as an action for the whole summary card, such as "Delete".
 *
 * Add it with a `*` to an `a class="govuk-link"` directly inside
 * `ngx-govuk-summary-card`. The card's title is added to the link's visually
 * hidden text, so screen reader users hear which card it's for.
 */
@Directive({
  selector: '[ngxGovukSummaryCardAction]',
})
export class NgxGovukSummaryCardAction {
  /** @internal */
  readonly template = inject(TemplateRef);
}
