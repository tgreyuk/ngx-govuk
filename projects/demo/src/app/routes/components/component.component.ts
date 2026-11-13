import { Component, computed, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StartCasePipe } from '../../pipes/start-case.pipe';
import { ComponentApiComponent } from './component-api/component-api.component';
import { ComponentCodeComponent } from './component-code/component-code.component';
import { findComponent } from './components.data';
import { EXAMPLES } from './examples';

@Component({
  selector: 'ngx-govuk-component',
  templateUrl: './component.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    StartCasePipe,
    NgComponentOutlet,
    ComponentCodeComponent,
    ComponentApiComponent,
  ],
})
export class ComponentComponent {
  componentId = input<string>('');

  /** Which tab to show, from the route's data. */
  tab = input<'examples' | 'api'>('examples');

  component = computed(() => findComponent(this.componentId()));

  examples = computed(() => EXAMPLES[this.componentId()] ?? []);
}
