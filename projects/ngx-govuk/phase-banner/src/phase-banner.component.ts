import { Component, input } from '@angular/core';
import { NgxGovukTag } from 'ngx-govuk/tag';

/**
 * Shows users that a service is still being worked on, with a tag for its
 * phase, such as "Alpha" or "Beta".
 *
 * Put it at the top of the page, under the header, and put the text inside
 * it, usually with a link for feedback.
 */
@Component({
  selector: 'ngx-govuk-phase-banner',
  imports: [NgxGovukTag],
  templateUrl: './phase-banner.component.html',
})
export class NgxGovukPhaseBanner {
  /**
   * The service's phase, shown in the tag, such as `Alpha` or `Beta`.
   */
  tagText = input.required<string>();
}
