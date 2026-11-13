import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPONENTS } from './components.data';

/**
 * Components landing page: the documented components with a summary of each.
 * The full GOV.UK list, including planned components, is in the menu.
 */
@Component({
  selector: 'ngx-govuk-components',
  imports: [RouterLink],
  templateUrl: './components.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {
  components = COMPONENTS.filter((c) => c.status === 'documented');
}
