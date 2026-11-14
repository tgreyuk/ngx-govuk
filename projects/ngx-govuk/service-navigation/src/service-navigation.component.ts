import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
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
   * Where the link goes, as you'd give it to `routerLink`, from the root,
   * such as `/apply`. Leave it unset for text that isn't a link.
   */
  routerLink?: string | readonly unknown[] | UrlTree;
}

/** GOV.UK Frontend's tablet breakpoint, if its CSS custom property is missing. */
const TABLET_BREAKPOINT = '40.0625rem';

/**
 * Shows users which service they're using, and helps them move around it.
 *
 * Put it straight after the GOV.UK header. Set `serviceName`, and the main
 * sections of the service as `navigation`. The item for the page users are
 * on is marked as current, and the item for a section they're in is marked
 * as active, from the router's URL.
 *
 * On small screens the navigation collapses behind a "Menu" button when
 * there's more than one item, as GOV.UK Frontend does.
 */
@Component({
  selector: 'ngx-govuk-service-navigation',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './service-navigation.component.html',
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
   * Where the service name links to, as you'd give it to `routerLink`, such
   * as the service's start page. Leave it unset for text.
   */
  serviceLink = input<string | readonly unknown[] | UrlTree>();

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
   * Collapses the navigation behind the menu button on small screens. By
   * default it collapses when there's more than one item.
   */
  collapseNavigationOnMobile = input<boolean>();

  /**
   * The navigation list's id. Leave it unset for a unique id.
   */
  navigationId = input<string>(
    inject(NgxGovukUtilsService).randomId('navigation'),
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
      if (item.routerLink === undefined) {
        return { ...item, current: false, active: false };
      }
      const link = this.segments(this.urlTree(item.routerLink));
      const current = sameStart(path, link) && path.length === link.length;
      // A link to the root is only active on the root itself.
      const active = current || (link.length > 0 && sameStart(path, link));
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
