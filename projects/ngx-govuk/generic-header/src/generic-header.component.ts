import { NgTemplateOutlet } from '@angular/common';
import { Component, input, booleanAttribute } from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';

/**
 * The header that tells users they're using a government service that's
 * not part of the GOV.UK website.
 *
 * Put your service's name or logo inside it, as text, an image or both. Put
 * it at the top of every page, after the skip link, inside a `header`
 * element with the `govuk-template__header` class. Put the service's
 * navigation in `ngx-govuk-service-navigation` straight after it.
 *
 * Services on GOV.UK should use the GOV.UK header instead.
 */
@Component({
  selector: 'ngx-govuk-generic-header',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './generic-header.component.html',
  host: {
    class: 'govuk-generic-header',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':where(:host:not([hidden])) { display: block; }',
})
export class NgxGovukGenericHeader {
  /**
   * Where the name or logo links to in your app, in any form
   * `routerLink` accepts. Defaults to the root of your app.
   */
  homepageLink = input<string | readonly unknown[] | UrlTree>('/');

  /**
   * Where the name or logo links to outside your app, such as
   * `https://www.example.com`. Used instead of `homepageLink` when set.
   * Together with `homepageLink`, it replaces GOV.UK's `url` option.
   */
  homepageUrl = input<string>();

  /**
   * Makes the header's content span the full width of the page, rather than
   * the width of the page's content.
   */
  fullWidth = input(false, { transform: booleanAttribute });
}
