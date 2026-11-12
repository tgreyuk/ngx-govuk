import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  contentChildren,
} from '@angular/core';
import { NgxGovukTabComponent } from '..';

@Component({
  selector: 'ngx-govuk-tabs-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukTabsComponent {
  @HostBinding('class') get className() {
    return `govuk-tabs`;
  }

  tabs = contentChildren(NgxGovukTabComponent);

  onSelected(tab: NgxGovukTabComponent) {
    this.tabs().forEach((panel) => {
      panel.selected.set(false);
    });
    tab.selected.set(true);
  }
}
