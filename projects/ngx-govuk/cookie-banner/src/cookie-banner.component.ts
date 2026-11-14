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
})
export class NgxGovukCookieBanner {
  /** Labels the banner for screen reader users. */
  ariaLabel = input<string>('Cookie banner');
}
