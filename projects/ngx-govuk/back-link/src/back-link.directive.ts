import { Directive, HostBinding, input } from '@angular/core';

/**
 * A link back to the previous page, for multi-page transactions.
 *
 * Add it to an `a` element, and set its `href` or `routerLink` to the previous
 * page.
 */
@Directive({
  selector: 'a[ngxGovukBackLink]',
})
export class NgxGovukBackLink {
  @HostBinding('class') get className() {
    const classes = [`govuk-back-link`];
    if (this.inversed()) {
      classes.push('govuk-back-link--inverse');
    }
    return classes.join(' ');
  }

  /**
   * Shows the link in white, for use on a dark background.
   */
  inversed = input<boolean>(false);
}
