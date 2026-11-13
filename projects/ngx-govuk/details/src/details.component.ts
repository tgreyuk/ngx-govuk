import { Component, input } from '@angular/core';

/**
 * Component to render the GOV.UK details component.
 *
 * The content slot should contain the content of the details content.
 *
 * @selector ngx-govuk-details
 */
@Component({
  selector: 'ngx-govuk-details',
  imports: [],
  templateUrl: './details.component.html',
})
export class NgxGovukDetails {
  /**
   * The main summary label.
   * @required
   */
  summaryText = input.required<string>();
}
