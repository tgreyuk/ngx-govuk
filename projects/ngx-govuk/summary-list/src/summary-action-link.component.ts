import { Component, computed, inject, input } from '@angular/core';
import { NgxGovukSummaryCard } from './summary-card.component';

/**
 * Styles a link as a summary list or card action, such as "Change".
 *
 * Add it to the `a` you mark with `*ngxGovukSummaryListAction` or
 * `*ngxGovukSummaryCardAction`. Inside a summary card it adds the card's
 * title to the link's visually hidden text, as GOV.UK Frontend does, so
 * screen reader users hear which card the action is for.
 */
@Component({
  // The action is the consumer's own link, so it keeps routerLink and any
  // other attributes; the component only adds GOV.UK's class and hidden text.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[ngxGovukSummaryActionLink]',
  templateUrl: './summary-action-link.component.html',
  host: { class: 'govuk-link' },
})
export class NgxGovukSummaryActionLink {
  private card = inject(NgxGovukSummaryCard, { optional: true });

  /**
   * Text added to the end of the link for screen reader users, to say what
   * the action is for, such as `name` for "Change name".
   */
  visuallyHiddenText = input<string>();

  protected hiddenText = computed(() => {
    const text = this.visuallyHiddenText();
    const title = this.card?.titleText();
    return (text ? ` ${text}` : '') + (title ? ` (${title})` : '');
  });
}
