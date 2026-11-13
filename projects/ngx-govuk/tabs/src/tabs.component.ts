import { DOCUMENT } from '@angular/common';
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
 * Lets users move between related sections of content, one at a time.
 *
 * Put an `ngx-govuk-tab` inside it for each section. From tablet width up, the
 * sections show as tabs. On smaller screens, every section shows in turn, with
 * a list of links to each one at the top.
 *
 * When the page loads, the tab whose `id` matches the URL fragment opens
 * first.
 */
@Component({
  selector: 'ngx-govuk-tabs',
  templateUrl: './tabs.component.html',
  host: { class: 'govuk-tabs' },
})
export class NgxGovukTabs {
  private document = inject(DOCUMENT);

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
   * @internal Whether the screen is wide enough for tabs. Below that, the
   * tabs are a list of links and every panel shows.
   */
  readonly isTabbed = signal(false);

  private links = viewChildren<ElementRef<HTMLAnchorElement>>('link');

  constructor() {
    const media = this.document.defaultView?.matchMedia?.(TABLET);
    if (media) {
      this.isTabbed.set(media.matches);
      const update = (event: MediaQueryListEvent) =>
        this.isTabbed.set(event.matches);
      media.addEventListener('change', update);
      inject(DestroyRef).onDestroy(() =>
        media.removeEventListener('change', update),
      );
    }

    // As GOV.UK Frontend does: open the tab the URL points to.
    afterNextRender(() => {
      const id = decodeURIComponent(this.document.location.hash.slice(1));
      const index = this.tabs().findIndex((tab) => tab.id() === id);
      if (id && index >= 0) this.selectedIndex.set(index);
    });
  }

  protected onClick(event: MouseEvent, index: number) {
    // The link's `#id` would resolve against the page's `base` element and
    // leave the page, so handle it here instead.
    event.preventDefault();
    if (this.isTabbed()) {
      this.selectedIndex.set(index);
    } else {
      this.tabs()[index].scrollIntoView();
    }
  }

  protected onKeydown(event: KeyboardEvent, index: number) {
    if (!this.isTabbed()) return;
    const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = index + step;
    if (next < 0 || next >= this.tabs().length) return;
    this.selectedIndex.set(next);
    this.links()[next].nativeElement.focus();
  }
}
