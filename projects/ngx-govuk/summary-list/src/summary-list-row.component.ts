import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  contentChildren,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { NgxGovukSummaryListAction } from './summary-list-action.directive';
import { NgxGovukSummaryList } from './summary-list.directive';

/**
 * A row in a summary list.
 *
 * Add it to a `div` inside `dl ngxGovukSummaryList`. Set its `key`, and put
 * the value inside it. Add actions, such as a "Change" link, with
 * `*ngxGovukSummaryListAction`.
 */
@Component({
  // GOV.UK's CSS needs each row to be a div directly inside the dl, so the
  // row is the div itself rather than an ngx-govuk- element around it.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'div[ngxGovukSummaryListRow]',
  imports: [NgTemplateOutlet],
  host: {
    class: 'govuk-summary-list__row',
    '[class.govuk-summary-list__row--no-actions]': 'noActions()',
  },
  template: `<dt class="govuk-summary-list__key">{{ key() }}</dt>
    <dd class="govuk-summary-list__value"><ng-content></ng-content></dd>
    @if (actions().length === 1) {
      <dd class="govuk-summary-list__actions">
        <ng-container [ngTemplateOutlet]="actions()[0].template" />
      </dd>
    } @else if (actions().length) {
      <dd class="govuk-summary-list__actions">
        <ul class="govuk-summary-list__actions-list">
          @for (action of actions(); track action) {
            <li class="govuk-summary-list__actions-list-item">
              <ng-container [ngTemplateOutlet]="action.template" />
            </li>
          }
        </ul>
      </dd>
    }`,
})
export class NgxGovukSummaryListRow {
  private list = inject(
    forwardRef(() => NgxGovukSummaryList),
    { optional: true },
  );

  /**
   * The row's key, such as the question that was asked.
   */
  key = input.required<string>();

  protected actions = contentChildren(NgxGovukSummaryListAction);

  /** @internal */
  readonly hasActions = computed(() => this.actions().length > 0);

  // As GOV.UK Frontend does: when any row has actions, rows without them get
  // a modifier that keeps their borders the full width of the list.
  protected noActions = computed(
    () => !this.hasActions() && !!this.list?.anyRowHasActions(),
  );
}
