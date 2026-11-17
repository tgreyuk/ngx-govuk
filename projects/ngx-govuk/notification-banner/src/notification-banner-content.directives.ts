import { Directive } from '@angular/core';

/**
 * Styles the main message in a notification banner, in large bold text.
 *
 * Add it to a `p` for a single line, or to a heading, such as an `h3`, when
 * more text follows it.
 */
@Directive({
  selector:
    'p[ngxGovukNotificationBannerHeading], h2[ngxGovukNotificationBannerHeading], h3[ngxGovukNotificationBannerHeading], h4[ngxGovukNotificationBannerHeading], h5[ngxGovukNotificationBannerHeading], h6[ngxGovukNotificationBannerHeading]',
  host: { class: 'govuk-notification-banner__heading' },
})
export class NgxGovukNotificationBannerHeading {}

/**
 * Styles a link in a notification banner, so it stands out against the
 * banner's colours.
 *
 * Add it to an `a` element inside the banner.
 */
@Directive({
  selector: 'a[ngxGovukNotificationBannerLink]',
  host: { class: 'govuk-notification-banner__link' },
})
export class NgxGovukNotificationBannerLink {}
