import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  signal,
} from '@angular/core';
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
  standalone: true,
  imports: [CommonModule, NgxGovukAccordionPanel],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukAccordion {
  panels = contentChildren(NgxGovukAccordionPanel);

  /**
   * Flag to determine if all NgxGovukAccordionPanel instances are expanded.
   */
  public isExpanded = signal(false);

  /**
   * Toggles all accordion NgxGovukAccordionPanel instances between expanded and collapsed.
   */
  public toggle() {
    this.isExpanded.set(!this.isExpanded());
    this.panels().forEach((panel) => {
      panel.isExpanded.set(this.isExpanded());
    });
  }

  someOtherMesthod() {
    return 'ok';
  }
}
