import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';

/** A previous or next link in block pagination. */
export interface NgxGovukPaginationLink {
  /** Where the link goes, as you'd give it to `routerLink`. */
  routerLink: string | readonly unknown[] | UrlTree;
  /** The link text. Defaults to "Previous page" or "Next page". */
  text?: string;
  /** A label shown under the link text, such as the page's title. */
  labelText?: string;
}

/** A page number in the list, or a gap shown as "⋯". */
type PageItem = { number: number } | { ellipsis: true };

/**
 * Helps users move between related pages.
 *
 * For numbered pages, such as search results, set `currentPage` and
 * `totalPages`. It links to the current route with the page number as a
 * query parameter, `?page=2`, and keeps any other query parameters. Read
 * that parameter to set `currentPage`. It shows nothing when there's only
 * one page.
 *
 * For a series of pages, such as a guide, leave `totalPages` unset and set
 * `previous` and `next` instead. They're shown as larger links, with an
 * optional label for each.
 */
@Component({
  selector: 'ngx-govuk-pagination',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './pagination.component.html',
})
export class NgxGovukPagination {
  /**
   * The page users are on, starting from 1.
   */
  currentPage = input<number>(1);

  /**
   * How many pages there are. Set it for numbered pages.
   */
  totalPages = input<number>();

  /**
   * The query parameter that holds the page number.
   */
  queryParam = input<string>('page');

  /**
   * The previous link, for a series of pages. Leave `totalPages` unset.
   */
  previous = input<NgxGovukPaginationLink>();

  /**
   * The next link, for a series of pages. Leave `totalPages` unset.
   */
  next = input<NgxGovukPaginationLink>();

  /**
   * The navigation landmark's label. Change it if a page has more than one
   * pagination, so users can tell them apart.
   */
  landmarkLabel = input<string>('Pagination');

  protected isNumbered = computed(() => this.totalPages() !== undefined);

  protected isBlock = computed(
    () => !this.isNumbered() && !!(this.previous() || this.next()),
  );

  protected isShown = computed(() =>
    this.isNumbered() ? (this.totalPages() ?? 0) > 1 : this.isBlock(),
  );

  protected hasPrevious = computed(() =>
    this.isNumbered() ? this.currentPage() > 1 : !!this.previous(),
  );

  protected hasNext = computed(() =>
    this.isNumbered()
      ? this.currentPage() < (this.totalPages() ?? 0)
      : !!this.next(),
  );

  /**
   * As GOV.UK recommends: the first and last pages, the current page and
   * the pages either side of it, with "⋯" for any gap of more than one page.
   */
  protected items = computed<PageItem[]>(() => {
    const total = this.totalPages() ?? 0;
    const current = this.currentPage();
    const shown = [...new Set([1, current - 1, current, current + 1, total])]
      .filter((page) => page >= 1 && page <= total)
      .sort((a, b) => a - b);

    const items: PageItem[] = [];
    shown.forEach((page, i) => {
      const gap = page - (shown[i - 1] ?? page - 1);
      if (gap === 2) items.push({ number: page - 1 });
      if (gap > 2) items.push({ ellipsis: true });
      items.push({ number: page });
    });
    return items;
  });

  protected pageParams(page: number) {
    return { [this.queryParam()]: page };
  }

  protected isPage(item: PageItem): item is { number: number } {
    return 'number' in item;
  }
}
