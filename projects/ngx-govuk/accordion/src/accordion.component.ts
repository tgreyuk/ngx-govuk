import { Component, computed, contentChildren, input } from '@angular/core';
import { NgxGovukAccordionPanel } from './accordion-panel.component';
import { NGX_GOVUK_ACCORDION } from './accordion.token';

/**
 * Lets users show and hide sections of related content on a page.
 *
 * Put an `ngx-govuk-accordion-panel` inside it for each section. The "Show all
 * sections" button opens or closes every section at once.
 */
@Component({
  selector: 'ngx-govuk-accordion',
  templateUrl: './accordion.component.html',
  providers: [{ provide: NGX_GOVUK_ACCORDION, useExisting: NgxGovukAccordion }],
})
export class NgxGovukAccordion {
  private panels = contentChildren(NgxGovukAccordionPanel);

  /**
   * The level of each section's heading. Change it to fit the page's
   * headings, such as `3` when the accordion is under an `h2`.
   */
  headingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(2);

  /** Whether every section is open, for the "Show all sections" button. */
  protected allExpanded = computed(() => {
    const panels = this.panels();
    return panels.length > 0 && panels.every((panel) => panel.expanded());
  });

  /**
   * Opens every section, or closes them all when they are all open. This is
   * what the "Show all sections" button does.
   */
  toggle() {
    const expand = !this.allExpanded();
    this.panels().forEach((panel) => panel.expanded.set(expand));
  }
}
