import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, model } from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NGX_GOVUK_ACCORDION } from './accordion.token';

/**
 * One section of an accordion, inside `ngx-govuk-accordion`.
 *
 * Put the section's content inside it. The heading is always shown; the
 * content shows when the section is open.
 */
@Component({
  selector: 'ngx-govuk-accordion-panel',
  imports: [NgTemplateOutlet],
  templateUrl: './accordion-panel.component.html',
  host: {
    class: 'govuk-accordion__section',
    '[class.govuk-accordion__section--expanded]': 'expanded()',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':host(:not([hidden])) { display: block; }',
})
export class NgxGovukAccordionPanel {
  private utilsService = inject(NgxGovukUtilsService);
  private accordion = inject(NGX_GOVUK_ACCORDION, { optional: true });

  /**
   * The section's heading, which users select to open or close it.
   */
  heading = input.required<string>();

  /**
   * A short line under the heading that sums up what's in the section.
   */
  summary = input<string>();

  /**
   * Whether the section is open. Set it to open the section from the start, or
   * bind it with `[(expanded)]` to keep it in step with your own state, such
   * as to remember which sections were open.
   */
  expanded = model(false);

  protected headingLevel = computed(() => this.accordion?.headingLevel() ?? 2);

  /** What screen readers announce for the section's button. */
  protected ariaLabel = computed(() =>
    [
      this.heading(),
      this.summary(),
      this.expanded() ? 'Hide this section' : 'Show this section',
    ]
      .filter(Boolean)
      .join(' , '),
  );

  protected headingId = this.utilsService.randomId('heading');
  protected summaryId = this.utilsService.randomId('summary');
  protected contentId = this.utilsService.randomId('content');

  /** For the section's own button; set `expanded` to open or close it. */
  protected toggle() {
    this.expanded.update((expanded) => !expanded);
  }
}
