
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ngx-govuk-tabs-nav',
  standalone: true,
  imports: [],
  templateUrl: './tabs-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukTabsNavComponent {
  @HostBinding('class') get className() {
    return `govuk-tabs`;
  }
}
