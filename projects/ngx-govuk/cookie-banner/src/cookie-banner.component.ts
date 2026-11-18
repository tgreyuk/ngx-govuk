import { Component, input } from '@angular/core';

/**
 * Asks users whether they accept cookies, and confirms their choice.
 *
 * Put it at the very top of the page, before the skip link, and only while
 * users haven't made a choice or haven't hidden the confirmation. Put each
 * message inside it in a `div` with `ngxGovukCookieBannerMessage`: one asking
 * users to accept or reject cookies, then a confirmation once they have.
 * Saving their choice is up to your service.
 */
@Component({
  selector: 'ngx-govuk-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  host: {
    class: 'govuk-cookie-banner',
    'data-nosnippet': '',
    role: 'region',
    '[attr.aria-label]': 'ariaLabel()',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':where(:host:not([hidden])) { display: block; }',
})
export class NgxGovukCookieBanner {
  /** Labels the banner for screen reader users. */
  ariaLabel = input<string>('Cookie banner');
}
