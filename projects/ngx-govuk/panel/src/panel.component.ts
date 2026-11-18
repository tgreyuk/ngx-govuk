import { Component, contentChild, input } from '@angular/core';
import { NgxGovukButtonGroup } from 'ngx-govuk/button';

/**
 * A coloured box that tells users the outcome of what they've done, such as
 * finishing an application, or stops them to check something before they
 * continue.
 *
 * Put the body text inside it. For an interruption panel, add the actions in
 * an `ngx-govuk-button-group` directly inside the panel, with each button
 * `inverse` and each link styled `govuk-link govuk-link--inverse`. A
 * confirmation panel has no actions.
 */
@Component({
  selector: 'ngx-govuk-panel',
  templateUrl: './panel.component.html',
  host: {
    class: 'govuk-panel',
    '[class.govuk-panel--confirmation]': "panelType() === 'confirmation'",
    '[class.govuk-panel--interruption]': "panelType() === 'interruption'",
  },
  styles: `
    /* Custom elements are inline by default; GOV.UK's styles expect a block. */
    :where(:host:not([hidden])) {
      display: block;
    }

    /*
     * GOV.UK leaves out the body when there's no content, and then the
     * title, as the last child, has no bottom margin. The body here is
     * always rendered, so hide it when empty and remove the margin too.
     */
    .govuk-panel__body:empty {
      display: none;
    }

    .govuk-panel__title:has(+ .govuk-panel__body:empty:last-child) {
      margin-bottom: 0;
    }
  `,
})
export class NgxGovukPanel {
  /**
   * The panel's heading.
   */
  titleText = input.required<string>();

  /**
   * The level of the panel's heading. Leave it at `1` when the panel is the
   * page's main heading.
   */
  headingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(1);

  /**
   * The kind of panel: `confirmation` when users have finished a transaction,
   * and `interruption` to stop users and check something before they carry
   * on.
   */
  panelType = input<'confirmation' | 'interruption'>('confirmation');

  protected actions = contentChild(NgxGovukButtonGroup, {
    descendants: false,
  });
}
