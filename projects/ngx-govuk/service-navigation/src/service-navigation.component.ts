import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  contentChild,
  contentChildren,
  DestroyRef,
  Directive,
  inject,
  input,
  signal,
  booleanAttribute,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, UrlTree } from '@angular/router';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { filter, map } from 'rxjs';

/** A link, or text, in the service navigation. */
export interface NgxGovukServiceNavigationItem {
  /** The item's text. */
  text: string;
  /**
   * Where the link goes, in any form `routerLink` accepts, from the root,
   * such as `/apply`. Leave it and `href` unset for text that isn't a link.
   */
  routerLink?: string | readonly unknown[] | UrlTree;
  /**
   * Where the link goes outside your app, such as a sign-out route on your
   * server. Used instead of `routerLink` when set. Together with
   * `routerLink`, it replaces GOV.UK's `href` option.
   */
  href?: string;
  /**
   * Marks the item as the page users are on. When unset, it's worked out
   * from the router's URL. Takes precedence over `active`.
   */
  current?: boolean;
  /**
   * Marks the item as the section users are in. When unset, it's worked
   * out from the router's URL.
   */
  active?: boolean;
}

/**
 * Content at the start of the service navigation, before the service name.
 *
 * Add the attribute to an element inside `ngx-govuk-service-navigation`.
 * Replaces GOV.UK's `slots.start` option.
 */
@Directive({ selector: '[ngxGovukServiceNavigationStart]' })
export class NgxGovukServiceNavigationStart {}

/**
 * Content at the end of the service navigation, such as
 * `ngx-govuk-language-navigation`.
 *
 * Add the attribute to an element inside `ngx-govuk-service-navigation`.
 * Replaces GOV.UK's `slots.end` option.
 */
@Directive({ selector: '[ngxGovukServiceNavigationEnd]' })
export class NgxGovukServiceNavigationEnd {
  /**
   * Shows the content on the same line as the navigation when there's room.
   * By default it goes below the navigation. Replaces GOV.UK's
   * `slots.end.align` option, set to `inline`.
   */
  inline = input(false, { transform: booleanAttribute });
}

/**
 * Your own item at the start of the navigation list, before the items in
 * `navigation`.
 *
 * Add it to an `li` inside `ngx-govuk-service-navigation`. Replaces GOV.UK's
 * `slots.navigationStart` option.
 */
@Directive({
  selector: 'li[ngxGovukServiceNavigationStartItem]',
  host: { class: 'govuk-service-navigation__item' },
})
export class NgxGovukServiceNavigationStartItem {}

/**
 * Your own item at the end of the navigation list, after the items in
 * `navigation`.
 *
 * Add it to an `li` inside `ngx-govuk-service-navigation`. Replaces GOV.UK's
 * `slots.navigationEnd` option.
 */
@Directive({
  selector: 'li[ngxGovukServiceNavigationEndItem]',
  host: { class: 'govuk-service-navigation__item' },
})
export class NgxGovukServiceNavigationEndItem {}

/** GOV.UK Frontend's tablet breakpoint, if its CSS custom property is missing. */
const TABLET_BREAKPOINT = '40.0625rem';

/**
 * Service navigation helps users understand that they're using your service
 * and lets them navigate around your service.
 *
 * Put it straight after the GOV.UK header. Set `serviceName`, and the main
 * sections of the service as `navigation`. The item for the page users are
 * on is marked as current, and the item for a section they're in is marked
 * as active, from the router's URL. Set `current` or `active` on an item to
 * mark it yourself.
 *
 * To add your own content, such as language navigation, put an element with
 * `ngxGovukServiceNavigationStart` or `ngxGovukServiceNavigationEnd` inside
 * it, or an `li` with `ngxGovukServiceNavigationStartItem` or
 * `ngxGovukServiceNavigationEndItem` for an item of your own in the list.
 *
 * On small screens the navigation collapses behind a "Menu" button when
 * there's more than one item, as GOV.UK Frontend does.
 */
@Component({
  selector: 'ngx-govuk-service-navigation',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './service-navigation.component.html',
  styles: ':where(:host:not([hidden])) { display: block; }',
})
export class NgxGovukServiceNavigation {
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  /**
   * The service's name.
   */
  serviceName = input<string>();

  /**
   * Where the service name links to, in any form `routerLink` accepts, such
   * as the service's start page. Leave it and `serviceUrl` unset for text.
   */
  serviceLink = input<string | readonly unknown[] | UrlTree>();

  /**
   * Where the service name links to outside your app, such as a start page
   * on GOV.UK. Used instead of `serviceLink` when set. Together with
   * `serviceLink`, it replaces GOV.UK's `serviceUrl` option.
   */
  serviceUrl = input<string>();

  /**
   * The service's main sections.
   */
  navigation = input<NgxGovukServiceNavigationItem[]>([]);

  /**
   * The text of the button that shows the navigation on small screens.
   */
  menuButtonText = input<string>('Menu');

  /**
   * The button's accessible label, if it should differ from its text.
   */
  menuButtonLabel = input<string>();

  /**
   * The navigation landmark's label. Defaults to the menu button's text.
   */
  navigationLabel = input<string>();

  /**
   * The label of the region around the service name and navigation.
   */
  ariaLabel = input<string>('Service information');

  /**
   * Styles the service navigation for a dark background.
   */
  inverse = input(false, { transform: booleanAttribute });

  /**
   * Collapses the navigation behind the menu button on small screens. By
   * default it collapses when there's more than one item.
   */
  collapseNavigationOnMobile = input<boolean | undefined, unknown>(undefined, {
    transform: booleanAttribute,
  });

  /**
   * The navigation list's id. Leave it unset for a unique id.
   */
  navigationId = input<string>(
    inject(NgxGovukUtilsService).randomId('navigation'),
  );

  protected startSlot = contentChild(NgxGovukServiceNavigationStart);
  protected endSlot = contentChild(NgxGovukServiceNavigationEnd);
  private startItems = contentChildren(NgxGovukServiceNavigationStartItem);
  private endItems = contentChildren(NgxGovukServiceNavigationEndItem);

  /** As GOV.UK Frontend does: a landmark when there's more than navigation. */
  protected isRegion = computed(
    () => !!(this.serviceName() || this.startSlot() || this.endSlot()),
  );

  protected hasList = computed(
    () =>
      this.navigation().length > 0 ||
      this.startItems().length > 0 ||
      this.endItems().length > 0,
  );

  protected collapses = computed(
    () => this.collapseNavigationOnMobile() ?? this.navigation().length > 1,
  );

  /** Wide screens show the navigation and hide the button, as without JavaScript. */
  protected isWide = signal(true);
  protected menuIsOpen = signal(false);
  protected menuHidden = computed(
    () => this.collapses() && !this.isWide() && !this.menuIsOpen(),
  );

  private path = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.segments(this.router.parseUrl(this.router.url))),
    ),
    { initialValue: this.segments(this.router.parseUrl(this.router.url)) },
  );

  /** Each item with how it relates to the page users are on. */
  protected items = computed(() => {
    const path = this.path();
    return this.navigation().map((item) => {
      let current = false;
      let active = false;
      if (item.routerLink !== undefined && item.href === undefined) {
        const link = this.segments(this.urlTree(item.routerLink));
        current = sameStart(path, link) && path.length === link.length;
        // A link to the root is only active on the root itself.
        active = link.length > 0 && sameStart(path, link);
      }
      current = item.current ?? current;
      active = current || (item.active ?? active);
      return { ...item, current, active };
    });
  });

  constructor() {
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view?.matchMedia) return;
      const breakpoint =
        view
          .getComputedStyle(this.document.documentElement)
          .getPropertyValue('--govuk-breakpoint-tablet')
          .trim() || TABLET_BREAKPOINT;
      const query = view.matchMedia(`(min-width: ${breakpoint})`);
      const check = () => this.isWide.set(query.matches);
      check();
      query.addEventListener('change', check);
      this.destroyRef.onDestroy(() =>
        query.removeEventListener('change', check),
      );
    });
  }

  /** `page` for the page users are on, `true` for a section they're in. */
  protected ariaCurrent(item: { current: boolean; active: boolean }) {
    return item.current ? 'page' : item.active ? 'true' : null;
  }

  protected toggleMenu() {
    this.menuIsOpen.update((open) => !open);
  }

  private urlTree(link: string | readonly unknown[] | UrlTree): UrlTree {
    if (link instanceof UrlTree) return link;
    return typeof link === 'string'
      ? this.router.parseUrl(link)
      : this.router.createUrlTree([...link]);
  }

  private segments(tree: UrlTree): string[] {
    return tree.root.children['primary']?.segments.map((s) => s.path) ?? [];
  }
}

/** Whether `path` starts with every segment of `link`. */
function sameStart(path: string[], link: string[]) {
  return link.every((segment, i) => path[i] === segment);
}
