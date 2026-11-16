import { Component, input } from '@angular/core';

/**
 * Lets users reveal more information under a short summary, which is always
 * shown.
 *
 * Add it to a `details` element and put the content to reveal inside it. Use
 * the element's own `open` attribute to show the content from the start, and
 * its `toggle` event to know when users open or close it.
 */
@Component({
  // A component rather than a directive, so it can render the summary. It
  // keeps the native element and all its attributes, as a directive would.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'details[ngxGovukDetails]',
  templateUrl: './details.component.html',
  host: { class: 'govuk-details' },
})
export class NgxGovukDetails {
  /**
   * The summary, which users select to show or hide the content.
   */
  summaryText = input.required<string>();
}
