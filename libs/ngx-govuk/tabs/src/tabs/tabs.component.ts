import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  contentChildren,
} from '@angular/core';
import { NgxGovukTabsPanelComponent } from '..';

@Component({
  selector: 'ngx-govuk-tabs-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukTabsComponent {
  @HostBinding('class') get className() {
    return `govuk-tabs`;
  }

  panels = contentChildren(NgxGovukTabsPanelComponent);

  onSelected(panel: NgxGovukTabsPanelComponent) {
    this.panels().forEach((panel) => {
      panel.selected.set(false);
    });
    panel.selected.set(true);
  }
}
