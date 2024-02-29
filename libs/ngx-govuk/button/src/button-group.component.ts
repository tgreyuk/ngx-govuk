import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
/**
 * Component that wraps a group of buttons. The content slot expects x number of buttons.
 *
 * @selector ngx-govuk-button-group
 */
@Component({
  selector: 'ngx-govuk-button-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukButtonGroup {
  @HostBinding('class') get className() {
    return 'govuk-button-group';
  }
}
