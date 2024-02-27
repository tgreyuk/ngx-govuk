import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  NgxGovukTabLinkDirective,
  NgxGovukTabsNavComponent,
} from 'ngx-govuk/tabs';
import { StartCasePipe } from '../../pipes/start-case.pipe';

@Component({
  selector: 'ngx-govuk-component',
  standalone: true,
  templateUrl: './component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgxGovukTabsNavComponent,
    NgxGovukTabLinkDirective,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    StartCasePipe,
  ],
})
export class ComponentComponent {
  componentId = input<string>();

  get displayDocsLink() {
    return !['form-group'].includes(this.componentId() || '');
  }
}
