import { Component, input } from '@angular/core';

/**
 * Asks users to give feedback about their experience using your service.
 *
 * Put it just before the footer, after `main` and outside the page's
 * `govuk-width-container`: it has its own. Put the body text inside it, with
 * the `govuk-body` class, and the link with the `govuk-link` class.
 */
@Component({
  selector: 'ngx-govuk-feedback',
  templateUrl: './feedback.component.html',
  host: {
    class: 'govuk-feedback govuk-width-container',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':where(:host:not([hidden])) { display: block; }',
})
export class NgxGovukFeedback {
  /** The heading, such as "Help us improve this service". */
  titleText = input.required<string>();

  /**
   * The level of the heading. Leave it at `2` unless the page's other
   * headings need a different level.
   */
  headingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(2);
}
