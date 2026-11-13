import { CommonModule } from '@angular/common';
import { Component, contentChildren, signal } from '@angular/core';
import { NgxGovukAccordionPanel } from './accordion-panel.component';

/**
 * The main accordion wrapping component.
 *
 * The template expects x number of NgxGovukAccordionPanel components in the content slot.
 *
 * @selector ngx-govuk-accordion
 *
 */
@Component({
  selector: 'ngx-govuk-accordion',
  imports: [CommonModule, NgxGovukAccordionPanel],
  templateUrl: './accordion.component.html',
})
export class NgxGovukAccordion {
  panels = contentChildren(NgxGovukAccordionPanel);

  /**
   * Flag to determine if all NgxGovukAccordionPanel instances are expanded.
   */
  isExpanded = signal(false);

  /**
   * Toggles all accordion NgxGovukAccordionPanel instances between expanded and collapsed.
   */
  toggle() {
    this.isExpanded.set(!this.isExpanded());
    this.panels().forEach((panel) => {
      panel.isExpanded.set(this.isExpanded());
    });
  }
}
