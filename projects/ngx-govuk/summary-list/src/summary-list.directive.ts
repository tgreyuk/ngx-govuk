import {
  computed,
  contentChildren,
  Directive,
  forwardRef,
} from '@angular/core';
import { NgxGovukSummaryListRow } from './summary-list-row.component';

/**
 * Summarises information as a list of keys and values, such as a user's
 * answers at the end of a form.
 *
 * Add it to a `dl` element, and add each row as a
 * `div ngxGovukSummaryListRow` inside it. For a list with no borders, also
 * add the `govuk-summary-list--no-border` class.
 */
@Directive({
  selector: 'dl[ngxGovukSummaryList]',
  host: { class: 'govuk-summary-list' },
})
export class NgxGovukSummaryList {
  private rows = contentChildren(forwardRef(() => NgxGovukSummaryListRow));

  /** @internal */
  readonly anyRowHasActions = computed(() =>
    this.rows().some((row) => row.hasActions()),
  );
}
