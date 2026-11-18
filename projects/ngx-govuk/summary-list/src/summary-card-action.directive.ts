import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Marks a link as an action for the whole summary card, such as "Delete".
 *
 * Add it with a `*` to an `a ngxGovukSummaryActionLink` directly inside
 * `ngx-govuk-summary-card`.
 */
@Directive({
  selector: '[ngxGovukSummaryCardAction]',
})
export class NgxGovukSummaryCardAction {
  /** @internal */
  readonly template = inject(TemplateRef);
}
