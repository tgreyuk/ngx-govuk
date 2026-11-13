import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ngx-govuk-tabs-nav',
  imports: [],
  templateUrl: './tabs-nav.component.html',
})
export class NgxGovukTabsNavComponent {
  @HostBinding('class') get className() {
    return `govuk-tabs`;
  }
}
