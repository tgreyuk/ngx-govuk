import { Component, input } from '@angular/core';

/**
 * Lets users reveal more information under a short summary, which is always
 * shown.
 *
 * Put the content to reveal inside it.
 */
@Component({
  selector: 'ngx-govuk-details',
  imports: [],
  templateUrl: './details.component.html',
})
export class NgxGovukDetails {
  /**
   * The summary, which users select to show or hide the content.
   */
  summaryText = input.required<string>();
}
