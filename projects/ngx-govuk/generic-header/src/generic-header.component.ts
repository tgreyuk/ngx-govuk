import { Component, input } from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';

/**
 * A header for services that aren't on GOV.UK, without GOV.UK's branding.
 *
 * Put your service's name or logo inside it, as text, an image or both. Put
 * it at the top of every page, after the skip link. Put the service's
 * navigation in `ngx-govuk-service-navigation` straight after it.
 *
 * Services on GOV.UK should use the GOV.UK header instead.
 */
@Component({
  selector: 'ngx-govuk-generic-header',
  imports: [RouterLink],
  templateUrl: './generic-header.component.html',
})
export class NgxGovukGenericHeader {
  /**
   * Where the name or logo links to, as you'd give it to `routerLink`.
   * Defaults to the root of your app.
   */
  homepageLink = input<string | readonly unknown[] | UrlTree>('/');

  /**
   * Makes the header's content span the full width of the page, rather than
   * the width of the page's content.
   */
  fullWidth = input<boolean>(false);
}
