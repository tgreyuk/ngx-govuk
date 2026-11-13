import { Component, input } from '@angular/core';

/**
 * Tells users about something important, such as a legal consequence of an
 * action, with a warning icon.
 *
 * Put the warning inside it.
 */
@Component({
  selector: 'ngx-govuk-warning-text',
  templateUrl: './warning-text.component.html',
})
export class NgxGovukWarningText {
  /**
   * Hidden text before the warning, for screen readers, which can't see the
   * icon.
   */
  iconFallbackText = input<string>('Warning');
}
