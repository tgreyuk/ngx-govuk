import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Marks a link as an action for its summary list row, such as "Change".
 *
 * Add it with a `*` to an `a class="govuk-link"` inside a row, and end the
 * link with visually hidden text that says what it changes:
 * `Change<span class="govuk-visually-hidden"> name</span>`.
 */
@Directive({
  selector: '[ngxGovukSummaryListAction]',
})
export class NgxGovukSummaryListAction {
  /** @internal */
  readonly template = inject(TemplateRef);
}
