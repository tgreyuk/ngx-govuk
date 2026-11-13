import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  NgxGovukTabLinkDirective,
  NgxGovukTabsNavComponent,
} from 'ngx-govuk/tabs';
import { StartCasePipe } from '../../pipes/start-case.pipe';
import { findComponent } from './components.data';

@Component({
  selector: 'ngx-govuk-component',
  templateUrl: './component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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

  component = computed(() => findComponent(this.componentId()));
}
