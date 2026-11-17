import { DOCUMENT, Location } from '@angular/common';
import {
  afterNextRender,
  Component,
  contentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChildren,
} from '@angular/core';
import { NgxGovukTab } from './tab.component';

/** GOV.UK Frontend's tablet breakpoint, where the list becomes tabs. */
const TABLET = '(min-width: 40.0625em)';

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
 */
@Component({
  selector: 'ngx-govuk-tabs',
  templateUrl: './tabs.component.html',
  host: { class: 'govuk-tabs' },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':where(:host:not([hidden])) { display: block; }',
})
export class NgxGovukTabs {
  private document = inject(DOCUMENT);
  private location = inject(Location);

  /**
   * The heading above the list of links on small screens. It's hidden when
   * the sections show as tabs.
   */
  titleText = input('Contents');

  /**
   * The position of the open tab, starting from 0. Bind it with
   * `[(selectedIndex)]` to keep it in step with your own state.
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
    this.open(next);
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
    const [, hash = ''] = this.location.path(true).split('#');
    const id = decodeURIComponent(hash);
    const index = this.tabs().findIndex((tab) => tab.id() === id);
    if (!id || index < 0) return;
    this.selectedIndex.set(index);
    if (focus && this.isTabbed()) this.links()[index]?.nativeElement.focus();
  }

  private currentPageUrl() {
    return this.location.prepareExternalUrl(this.location.path());
  }
}
