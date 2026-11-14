import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';

/** A language in the language navigation. */
export interface NgxGovukLanguageNavigationItem {
  /**
   * The language's name, written in that language, such as "Cymraeg" for
   * Welsh.
   */
  text: string;
  /**
   * The language's tag, such as `cy` for Welsh, so screen readers say its
   * name properly.
   */
  lang: string;
  /**
   * The language tag of the page the link goes to, for search engines.
   * Defaults to `lang`.
   */
  hrefLang?: string;
  /**
   * Which way the language's name is written: `ltr` for left to right, or
   * `rtl` for right to left. Set it on every item if the navigation mixes
   * the two.
   */
  dir?: 'ltr' | 'rtl';
  /**
   * The page in this language, as you'd give it to `routerLink`, when your
   * app switches language itself.
   */
  routerLink?: string | readonly unknown[] | UrlTree;
  /**
   * The page in this language, when it's served from elsewhere, such as a
   * separate build of your app for each language. Used when `routerLink`
   * isn't set.
   */
  href?: string;
  /**
   * Marks the language the page is in. Defaults to `true` for an item
   * without a `routerLink` or `href`.
   */
  current?: boolean;
  /**
   * Text after the link for screen reader users only, saying what it does,
   * written in the link's language, such as "Newid yr iaith i'r Cymraeg".
   */
  languageDescriptionText?: string;
}

/**
 * Lets users switch the language a page is shown in.
 *
 * Set the languages as `items`, each with its name written in that
 * language. Mark the language the page is in as `current`, or leave out
 * its link.
 */
@Component({
  selector: 'ngx-govuk-language-navigation',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './language-navigation.component.html',
})
export class NgxGovukLanguageNavigation {
  /** The languages to list. */
  items = input.required<NgxGovukLanguageNavigationItem[]>();

  /**
   * Labels the navigation for screen reader users, written in the page's
   * language.
   */
  ariaLabel = input<string>('Language');

  /** Shows the navigation in white, for use on a dark background. */
  inverse = input<boolean>(false);

  protected isCurrent(item: NgxGovukLanguageNavigationItem) {
    return (
      item.current ?? (item.routerLink === undefined && item.href === undefined)
    );
  }
}
