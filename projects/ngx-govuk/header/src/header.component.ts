import { Component, input } from '@angular/core';

/**
 * The header that tells users they're using a GOV.UK service, with the
 * GOV.UK logo linking to the GOV.UK homepage.
 *
 * Put it at the top of every page, after the skip link. Put the service's
 * name and navigation in `ngx-govuk-service-navigation` straight after it.
 *
 * Only services on GOV.UK may use it. Other services should use the generic
 * header.
 */
@Component({
  selector: 'ngx-govuk-header',
  templateUrl: './header.component.html',
})
export class NgxGovukHeader {
  /**
   * Where the logo links to. Leave it as GOV.UK's homepage unless your
   * service is one of GOV.UK's own products.
   */
  homepageUrl = input<string>('//gov.uk');

  /**
   * The name of a GOV.UK product, shown after the logo, such as
   * "Design System". Most services don't need it.
   */
  productName = input<string>();

  /**
   * Makes the header's content span the full width of the page, rather than
   * the width of the page's content.
   */
  fullWidth = input<boolean>(false);
}
