import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Marks a link as an action for its summary list row, such as "Change".
 *
 * Add it with a `*` to an `a ngxGovukSummaryActionLink` inside a row, and
 * set the link's `visuallyHiddenText` to say what it changes, such as
 * `name`.
 */
@Directive({
  selector: '[ngxGovukSummaryListAction]',
})
export class NgxGovukSummaryListAction {
  /** @internal */
  readonly template = inject(TemplateRef);
}
