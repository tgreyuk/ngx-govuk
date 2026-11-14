import { Component, input } from '@angular/core';

/**
 * Invites users to give feedback on the service, with a link to where they
 * can give it.
 *
 * Put it at the end of the page's main content. Put the body text inside it,
 * with the `govuk-body` class, and the link with the `govuk-link` class.
 */
@Component({
  selector: 'ngx-govuk-feedback',
  templateUrl: './feedback.component.html',
})
export class NgxGovukFeedback {
  /** The heading, such as "Help us improve this service". */
  titleText = input.required<string>();

  /** The level of the heading. */
  headingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(2);
}
