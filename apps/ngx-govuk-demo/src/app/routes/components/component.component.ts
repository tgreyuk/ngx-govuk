import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  NgxGovukTabLinkDirective,
  NgxGovukTabsNavComponent,
} from 'ngx-govuk/tabs';

@Component({
  selector: 'ngx-govuk-component',
  standalone: true,
  imports: [
    CommonModule,
    NgxGovukTabsNavComponent,
    NgxGovukTabLinkDirective,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentComponent {
  componentId = input<string>();
}
