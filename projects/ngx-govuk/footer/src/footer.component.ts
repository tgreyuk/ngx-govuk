import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, Directive, input } from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';

/** A link in the footer. */
export interface NgxGovukFooterLink {
  /** The link's text. */
  text: string;
  /**
   * Where the link goes in your app, as you'd give it to `routerLink`, such
   * as `/cookies`.
   */
  routerLink?: string | readonly unknown[] | UrlTree;
  /**
   * Where the link goes outside your app, such as
   * `https://www.gov.uk/help`. Used when `routerLink` isn't set.
   */
  href?: string;
}

/** A section of links in the footer's navigation, under a heading. */
export interface NgxGovukFooterSection {
  /** The section's heading. */
  title: string;
  /** The section's links. */
  items: NgxGovukFooterLink[];
  /**
   * How wide the section is, as a GOV.UK grid width, such as `one-half` or
   * `two-thirds`. Defaults to `full`.
   */
  width?:
    | 'full'
    | 'three-quarters'
    | 'two-thirds'
    | 'one-half'
    | 'one-third'
    | 'one-quarter';
  /** How many columns to list the links in, on wider screens. */
  columns?: 1 | 2 | 3;
}

/**
 * Adds your own content to the footer, under the support links, such as
 * "Built by" and a link to your organisation.
 *
 * Add it to an element inside `ngx-govuk-footer`. Give any links in it the
 * `govuk-footer__link` class.
 */
@Directive({
  selector: '[ngxGovukFooterMeta]',
  host: { class: 'govuk-footer__meta-custom' },
})
export class NgxGovukFooterMeta {}

/**
 * The footer at the bottom of every page, with the crown, links to support
 * pages such as cookies and privacy, and the content licence and copyright.
 *
 * Put it at the bottom of every page. Set the support links as
 * `metaLinks`, and add your own content in an element with
 * `ngxGovukFooterMeta`. Set `navigation` for sections of links under
 * headings, as GOV.UK has.
 */
@Component({
  selector: 'ngx-govuk-footer',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './footer.component.html',
})
export class NgxGovukFooter {
  /**
   * Sections of links under headings, shown above the support links.
   */
  navigation = input<NgxGovukFooterSection[]>([]);

  /**
   * Links to support pages, such as help, cookies, accessibility statement
   * and privacy notice.
   */
  metaLinks = input<NgxGovukFooterLink[]>([]);

  /**
   * A heading for the support links, for screen reader users only.
   */
  metaLinksTitle = input<string>('Support links');

  /**
   * Shows that content is available under the Open Government Licence.
   * Set it to `false` if your content isn't.
   */
  contentLicence = input<boolean>(true);

  /**
   * The copyright notice, which links to The National Archives' page on
   * Crown copyright.
   */
  copyright = input<string>('© Crown copyright');

  protected metaContent = contentChild(NgxGovukFooterMeta);
}
