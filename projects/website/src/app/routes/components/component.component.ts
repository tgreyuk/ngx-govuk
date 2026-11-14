import { Component, computed, input, resource } from '@angular/core';
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

  /**
   * The examples with their demo components, once loaded. Only loads on the
   * Examples tab.
   */
  private loadedExamples = resource({
    params: () =>
      this.tab() === 'examples' ? EXAMPLES[this.componentId()] : undefined,
    loader: ({ params }) =>
      Promise.all(
        params.map(async (example) => ({
          ...example,
          component: await example.load(),
        })),
      ),
  });

  examples = computed(() => this.loadedExamples.value() ?? []);
}
