import { Component, contentChildren, input } from '@angular/core';
import { NgxGovukSummaryCardAction } from './summary-card-action.directive';
import { NgxGovukSummaryActionOutlet } from './summary-action-outlet.directive';

/**
 * Shows a summary list as a card with a title, to summarise several
 * different things, such as each job in someone's job history.
 *
 * Put a `dl ngxGovukSummaryList` inside it. Add actions for the whole card,
 * such as "Delete", with `*ngxGovukSummaryCardAction`. The card's title is
 * added to the visually hidden text of every action in it, including the
 * rows' actions.
 */
@Component({
  selector: 'ngx-govuk-summary-card',
  imports: [NgxGovukSummaryActionOutlet],
  templateUrl: './summary-card.component.html',
})
export class NgxGovukSummaryCard {
  /**
   * The card's title.
   */
  titleText = input<string>();

  /**
   * The level of the title's heading.
   */
  titleHeadingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(2);

  protected actions = contentChildren(NgxGovukSummaryCardAction);
}
