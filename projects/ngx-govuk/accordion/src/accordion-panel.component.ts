import { Component, computed, inject, input, model } from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';

/**
 * One section of an accordion, inside `ngx-govuk-accordion`.
 *
 * Put the section's content inside it. The heading is always shown; the
 * content shows when the section is open.
 */
@Component({
  selector: 'ngx-govuk-accordion-panel',
  templateUrl: './accordion-panel.component.html',
  host: {
    class: 'govuk-accordion__section',
    '[class.govuk-accordion__section--expanded]': 'expanded()',
  },
})
export class NgxGovukAccordionPanel {
  private utilsService = inject(NgxGovukUtilsService);

  /**
   * The section's heading, which users select to open or close it.
   */
  heading = input.required<string>();

  /**
   * Whether the section is open. Set it to open the section from the start, or
   * bind it with `[(expanded)]` to keep it in step with your own state, such
   * as to remember which sections were open.
   */
  expanded = model(false);

  /** What screen readers announce for the section's button. */
  protected ariaLabel = computed(() =>
    [
      this.heading(),
      this.expanded() ? 'Hide this section' : 'Show this section',
    ]
      .filter(Boolean)
      .join(' , '),
  );

  protected headingId = this.utilsService.randomId('heading');
  protected contentId = this.utilsService.randomId('content');

  /** For the section's own button; set `expanded` to open or close it. */
  protected toggle() {
    this.expanded.update((expanded) => !expanded);
  }
}
