import { Component, HostBinding } from '@angular/core';
/**
 * Lays out buttons, and any links that go with them, side by side with the
 * right spacing.
 *
 * Put the buttons and links inside it.
 */
@Component({
  selector: 'ngx-govuk-button-group',
  imports: [],
  templateUrl: './button-group.component.html',
})
export class NgxGovukButtonGroup {
  @HostBinding('class') get className() {
    return 'govuk-button-group';
  }
}
