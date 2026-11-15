import { Directive, input } from '@angular/core';

/**
 * A link back to the previous page, for multi-page transactions.
 *
 * Add it to an `a` element, and set its `href` or `routerLink` to the previous
 * page.
 */
@Directive({
  selector: 'a[ngxGovukBackLink]',
  host: {
    class: 'govuk-back-link',
    '[class.govuk-back-link--inverse]': 'inversed()',
  },
})
export class NgxGovukBackLink {
  /**
   * Shows the link in white, for use on a dark background.
   */
  inversed = input<boolean>(false);
}
