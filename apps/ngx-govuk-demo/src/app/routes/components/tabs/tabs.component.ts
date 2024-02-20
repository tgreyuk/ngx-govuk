import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgxGovukTabsComponent,
  NgxGovukTabsPanelComponent,
} from 'ngx-govuk/tabs';

@Component({
  standalone: true,
  imports: [CommonModule, NgxGovukTabsComponent, NgxGovukTabsPanelComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {}
