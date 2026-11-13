import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, input, model } from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';

/**
 * One section of an accordion, inside `ngx-govuk-accordion`.
 *
 * Put the section's content inside it. The heading is always shown; the
 * content shows when the section is open.
 */
@Component({
  selector: 'ngx-govuk-accordion-panel',
  imports: [CommonModule],
  templateUrl: './accordion-panel.component.html',
})
export class NgxGovukAccordionPanel {
  private utilsService = inject(NgxGovukUtilsService);

  @HostBinding('class') get className() {
    const classes = ['govuk-accordion__section'];
    if (this.expanded()) {
      classes.push('govuk-accordion__section--expanded');
    }
    return classes.join(' ');
  }

  /**
   * The section's heading, which users select to open or close it.
   */
  heading = input.required<string>();

  /**
   * Whether the section is open. Set it to open the section from the start, or
   * bind it with `[(expanded)]` to keep it in step with your own state.
   */
  expanded = model(false);

  protected headingId = this.utilsService.randomId('heading');
  protected contentId = this.utilsService.randomId('content');

  /** For the section's own button; set `expanded` to open or close it. */
  protected toggle() {
    this.expanded.update((expanded) => !expanded);
  }
}
