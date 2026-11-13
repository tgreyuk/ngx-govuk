import { Component, HostBinding } from '@angular/core';
/**
 * Component that wraps a group of buttons. The content slot expects x number of buttons.
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
