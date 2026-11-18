import { DOCUMENT, Location } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  containsTree,
  IsActiveMatchOptions,
  NavigationEnd,
  Router,
  RouterLink,
  UrlTree,
} from '@angular/router';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { filter } from 'rxjs';
import { NgxGovukTab, NgxGovukTabLink } from './tab.component';

/** GOV.UK Frontend's tablet breakpoint, where the list becomes tabs. */
const TABLET = '(min-width: 40.0625em)';

/**
 * A routed tab is open on its own route and the routes below it, whatever
 * the query or fragment.
 */
const ROUTE_MATCH: IsActiveMatchOptions = {
  paths: 'subset',
  queryParams: 'ignored',
  matrixParams: 'ignored',
  fragment: 'ignored',
};

/**
 * Lets users navigate between related sections of content, displaying one
 * section at a time.
 *
 * Put an `ngx-govuk-tab` inside it for each section. From tablet width up, the
 * sections show as tabs. On smaller screens, every section shows in turn, with
 * a list of links to each one at the top.
 *
 * As GOV.UK Frontend does, the URL follows the open tab: the tab whose `id`
 * matches the URL fragment opens when the page loads, opening a tab adds a
 * history entry, and the browser's back button goes back to the previous
 * tab. Tabs only show when the page's `body` has the
 * `govuk-frontend-supported` class, which GOV.UK's styles need for them.
 *
 * For tabs that each open a route, set every tab's `link` and put a
 * `router-outlet` inside `ngx-govuk-tabs` after them. The tab whose route is
 * active is open, and the outlet shows in a single panel below the tabs, on
 * small screens too. This is an ngx-govuk addition: GOV.UK's tabs are always
 * sections of one page.
 */
@Component({
  selector: 'ngx-govuk-tabs',
  imports: [RouterLink],
  templateUrl: './tabs.component.html',
  host: { class: 'govuk-tabs' },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':where(:host:not([hidden])) { display: block; }',
})
export class NgxGovukTabs {
  private document = inject(DOCUMENT);
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute, { optional: true });

  /**
   * The heading above the list of links on small screens. It's hidden when
   * the sections show as tabs.
   */
  titleText = input('Contents');

  /**
   * The position of the open tab, starting from 0. Bind it with
   * `[(selectedIndex)]` to keep it in step with your own state. With routed
   * tabs, the router decides which tab is open, and this reports it.
   */
  selectedIndex = model(0);

  /** @internal Read by each tab to show or hide its panel. */
  readonly tabs = contentChildren(NgxGovukTab);

  /**
   * @internal Whether the sections show as tabs. Below tablet width, or
   * without the `govuk-frontend-supported` class that GOV.UK's styles need,
   * the tabs are a list of links and every panel shows.
   */
  readonly isTabbed = signal(false);

  /**
   * The current page's URL, without its fragment. Links start with it, as a
   * bare `#id` would resolve against the page's `base` element.
   */
  protected pageUrl = signal(this.currentPageUrl());

  /** Whether the tabs open routes, rather than sections of the page. */
  protected routed = computed(() =>
    this.tabs().some((tab) => tab.link() !== undefined),
  );

  /** The id of the single panel that routed tabs show their route in. */
  protected panelId = inject(NgxGovukUtilsService).randomId('govuk-tabs-panel');

  private currentUrl = signal<UrlTree | undefined>(undefined);

  /**
   * The routed tab whose route is active. Where several are, such as a tab
   * for `''` and one for `day`, the most specific wins.
   */
  private activeIndex = computed(() => {
    const url = this.currentUrl();
    let found = -1;
    let foundLength = -1;
    if (!url) return found;
    this.tabs().forEach((tab, index) => {
      const link = tab.link();
      if (link === undefined) return;
      const tree = this.urlTree(link);
      const length = this.router.serializeUrl(tree).length;
      if (containsTree(url, tree, ROUTE_MATCH) && length > foundLength) {
        found = index;
        foundLength = length;
      }
    });
    return found;
  });

  /** The open tab, or -1 when no routed tab's route is active. */
  protected openIndex = computed(() =>
    this.routed() ? this.activeIndex() : this.selectedIndex(),
  );

  /** The tab that's in the page's tab order: the open one, or the first. */
  protected focusIndex = computed(() => Math.max(this.openIndex(), 0));

  private links = viewChildren<ElementRef<HTMLAnchorElement>>('link');

  constructor() {
    const destroyRef = inject(DestroyRef);
    const supported = this.document.body?.classList.contains(
      'govuk-frontend-supported',
    );
    const media = this.document.defaultView?.matchMedia?.(TABLET);
    if (media && supported) {
      this.isTabbed.set(media.matches);
      const update = (event: MediaQueryListEvent) =>
        this.isTabbed.set(event.matches);
      media.addEventListener('change', update);
      destroyRef.onDestroy(() => media.removeEventListener('change', update));
    }

    // Routed tabs follow the router's URL.
    this.currentUrl.set(this.router.parseUrl(this.router.url));
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() =>
        this.currentUrl.set(this.router.parseUrl(this.router.url)),
      );
    effect(() => {
      const index = this.activeIndex();
      if (this.routed() && index >= 0) this.selectedIndex.set(index);
    });

    // Keep links pointing at the page as the router moves between URLs.
    destroyRef.onDestroy(
      this.location.onUrlChange(() => this.pageUrl.set(this.currentPageUrl())),
    );

    // As GOV.UK Frontend does: open the tab the URL points to on load, and
    // when the fragment changes, such as with the back button.
    afterNextRender(() => {
      this.openTabFromUrl(false);
      const subscription = this.location.subscribe(() =>
        this.openTabFromUrl(true),
      );
      destroyRef.onDestroy(() => subscription.unsubscribe());
    });
  }

  protected onClick(event: MouseEvent, index: number) {
    // On small screens the link is a plain link to its section.
    if (!this.isTabbed()) return;
    event.preventDefault();
    this.open(index);
  }

  protected onKeydown(event: KeyboardEvent, index: number) {
    if (!this.isTabbed()) return;
    const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = index + step;
    if (next < 0 || next >= this.tabs().length) return;
    const link = this.tabs()[next].link();
    if (link === undefined) {
      this.open(next);
    } else {
      void this.router.navigateByUrl(this.urlTree(link));
    }
    this.links()[next].nativeElement.focus();
  }

  /** Opens a tab, and adds a history entry for it as GOV.UK Frontend does. */
  private open(index: number) {
    if (index === this.selectedIndex()) return;
    this.selectedIndex.set(index);
    // Unlike setting `location.hash`, this doesn't scroll to the panel.
    this.location.go(`${this.location.path()}#${this.tabs()[index].id()}`);
  }

  private openTabFromUrl(focus: boolean) {
    if (this.routed()) return;
    const [, hash = ''] = this.location.path(true).split('#');
    const id = decodeURIComponent(hash);
    const index = this.tabs().findIndex((tab) => tab.id() === id);
    if (!id || index < 0) return;
    this.selectedIndex.set(index);
    if (focus && this.isTabbed()) this.links()[index]?.nativeElement.focus();
  }

  /** A routed tab's link, resolved as `routerLink` would resolve it. */
  private urlTree(link: NgxGovukTabLink): UrlTree {
    if (link instanceof UrlTree) return link;
    const commands = typeof link === 'string' ? [link] : [...link];
    return this.router.createUrlTree(commands, {
      relativeTo: this.route ?? undefined,
    });
  }

  private currentPageUrl() {
    return this.location.prepareExternalUrl(this.location.path());
  }
}
