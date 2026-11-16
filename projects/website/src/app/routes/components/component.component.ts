import { Component, computed, input, resource, signal } from '@angular/core';
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
  tab = input<'overview' | 'api'>('overview');

  component = computed(() => findComponent(this.componentId()));

  /**
   * The examples with their demo components, once loaded. Only loads on the
   * Overview tab.
   */
  private loadedExamples = resource({
    params: () =>
      this.tab() === 'overview' ? EXAMPLES[this.componentId()] : undefined,
    loader: ({ params }) =>
      Promise.all(
        params.map(async (example) => ({
          ...example,
          component: await example.load(),
        })),
      ),
  });

  examples = computed(() => this.loadedExamples.value() ?? []);

  /** How many times each example has been reset, by path. */
  protected resets = signal<Record<string, number>>({});

  /** Renders an example afresh, back in its first state. */
  protected reset(path: string) {
    this.resets.update((resets) => ({
      ...resets,
      [path]: (resets[path] ?? 0) + 1,
    }));
  }
}
