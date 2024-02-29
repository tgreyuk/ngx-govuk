import { Directive, HostBinding, input } from '@angular/core';

/**
 * Directive to be added to native "a" elements to style them as GOV.UK back links.
 *
 * @selector a[ngxGovukBackLink]
 */
@Directive({
  selector: 'a[ngxGovukBackLink]',
  standalone: true,
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
   * Inverse the button colour scheme for use when placed on dark backgrounds.
   *
   * @initialValue false
   */
  inversed = input<boolean>(false);
}
