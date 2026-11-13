import { CommonModule } from '@angular/common';
import { Component, computed, contentChildren } from '@angular/core';
import { NgxGovukAccordionPanel } from './accordion-panel.component';

/**
 * Lets users show and hide sections of related content on a page.
 *
 * Put an `ngx-govuk-accordion-panel` inside it for each section. The "Show all
 * sections" button opens or closes every section at once.
 */
@Component({
  selector: 'ngx-govuk-accordion',
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
})
export class NgxGovukAccordion {
  private panels = contentChildren(NgxGovukAccordionPanel);

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
