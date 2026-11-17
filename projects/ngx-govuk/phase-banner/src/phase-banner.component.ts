import { Component, input } from '@angular/core';
import { NgxGovukTag, NgxGovukTagColour } from 'ngx-govuk/tag';

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
  host: {
    class: 'govuk-phase-banner govuk-width-container',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':where(:host:not([hidden])) { display: block; }',
})
export class NgxGovukPhaseBanner {
  /**
   * The service's phase, shown in the tag, such as `Alpha` or `Beta`.
   */
  tagText = input.required<string>();

  /**
   * The tag's colour, as on the tag. Leave it unset for blue. Replaces
   * GOV.UK's `tag.classes`.
   */
  tagColour = input<NgxGovukTagColour>();
}
