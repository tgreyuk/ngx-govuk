import { computed, Directive, inject, input } from '@angular/core';

/**
 * Styles a `table` element as a GOV.UK table, to make information easier to
 * compare and scan.
 *
 * Add the table's parts as native elements with their own directives:
 * `caption ngxGovukTableCaption`, `thead ngxGovukTableHead`,
 * `tbody ngxGovukTableBody`, `tr ngxGovukTableRow`,
 * `th ngxGovukTableHeader` and `td ngxGovukTableCell`.
 */
@Directive({
  selector: 'table[ngxGovukTable]',
  host: { class: 'govuk-table' },
})
export class NgxGovukTable {}

/**
 * Styles a table's `caption`, which describes what the table is about.
 */
@Directive({
  selector: 'caption[ngxGovukTableCaption]',
  host: {
    class: 'govuk-table__caption',
    '[class]': 'sizeClass()',
  },
})
export class NgxGovukTableCaption {
  /**
   * The caption's size. Use a size like the page's headings, such as `m`.
   * When unset, the caption is bold body text.
   */
  captionSize = input<'s' | 'm' | 'l' | 'xl'>();

  protected sizeClass = computed(() => {
    const size = this.captionSize();
    return size ? `govuk-table__caption--${size}` : '';
  });
}

/**
 * Styles a table's `thead`.
 */
@Directive({
  selector: 'thead[ngxGovukTableHead]',
  host: { class: 'govuk-table__head' },
})
export class NgxGovukTableHead {}

/**
 * Styles a table's `tbody`.
 */
@Directive({
  selector: 'tbody[ngxGovukTableBody]',
  host: { class: 'govuk-table__body' },
})
export class NgxGovukTableBody {}

/**
 * Styles a `tr` in a table's head or body.
 */
@Directive({
  selector: 'tr[ngxGovukTableRow]',
  host: { class: 'govuk-table__row' },
})
export class NgxGovukTableRow {}

/**
 * Styles a `th` as a header for its column or row.
 *
 * In `thead ngxGovukTableHead` it gets `scope="col"`, and elsewhere
 * `scope="row"`, as GOV.UK Frontend sets them. Use it as the first cell of a
 * body row to make that cell the row's header.
 */
@Directive({
  selector: 'th[ngxGovukTableHeader]',
  host: {
    class: 'govuk-table__header',
    '[class.govuk-table__header--numeric]': "format() === 'numeric'",
    '[attr.scope]': 'scope',
  },
})
export class NgxGovukTableHeader {
  protected scope = inject(NgxGovukTableHead, { optional: true })
    ? 'col'
    : 'row';

  /**
   * Set to `numeric` for a column of numbers, to right-align the header
   * with them.
   */
  format = input<'numeric'>();
}

/**
 * Styles a `td` as a table cell.
 */
@Directive({
  selector: 'td[ngxGovukTableCell]',
  host: {
    class: 'govuk-table__cell',
    '[class.govuk-table__cell--numeric]': "format() === 'numeric'",
  },
})
export class NgxGovukTableCell {
  /**
   * Set to `numeric` for a number, to right-align it and use tabular
   * figures, so numbers line up.
   */
  format = input<'numeric'>();
}
