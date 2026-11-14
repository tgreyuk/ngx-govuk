import { Component, computed, ElementRef, inject, input } from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukTabs } from './tabs.component';

/**
 * One section of tabs, inside `ngx-govuk-tabs`.
 *
 * Put the section's content inside it. It shows when its tab is open.
 */
@Component({
  selector: 'ngx-govuk-tab',
  template: '<ng-content></ng-content>',
  // The element is the panel itself, which GOV.UK's CSS expects to be a block.
  styles: ':host { display: block; }',
  host: {
    class: 'govuk-tabs__panel',
    '[class.govuk-tabs__panel--hidden]': '!isSelected()',
    '[attr.id]': 'id()',
    '[attr.role]': 'tabs.isTabbed() ? "tabpanel" : null',
    '[attr.aria-labelledby]': 'tabs.isTabbed() ? tabId() : null',
  },
})
export class NgxGovukTab {
  protected tabs = inject(NgxGovukTabs);
  private element = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * The text of the section's tab.
   */
  label = input.required<string>();

  /**
   * The id of the section. Its tab links to it, so it's the URL fragment that
   * opens this tab when the page loads. Leave it unset for a unique id.
   */
  id = input<string>(inject(NgxGovukUtilsService).randomId('govuk-tabs-panel'));

  /** @internal The id of the section's tab, which labels the section. */
  readonly tabId = computed(() => `tab_${this.id()}`);

  protected isSelected = computed(
    () => this.tabs.tabs().indexOf(this) === this.tabs.selectedIndex(),
  );

  /** @internal Brings the section into view, when tabs show as a list. */
  scrollIntoView() {
    this.element.nativeElement.scrollIntoView();
  }
}
