import { Component, computed, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
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
    StartCasePipe,
    NgComponentOutlet,
    ComponentCodeComponent,
    ComponentApiComponent,
  ],
})
export class ComponentComponent {
  componentId = input<string>('');

  component = computed(() => findComponent(this.componentId()));

  examples = computed(() => EXAMPLES[this.componentId()] ?? []);
}
