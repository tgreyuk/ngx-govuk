import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { findComponent } from './components.data';

/**
 * Shown for components on GOV.UK's list that ngx-govuk does not document yet.
 */
@Component({
  selector: 'ngx-govuk-component-placeholder',
  imports: [RouterLink],
  templateUrl: './component-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPlaceholderComponent {
  componentId = input<string>();

  component = computed(() => findComponent(this.componentId()));
}
