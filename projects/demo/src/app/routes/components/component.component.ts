import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  /** The name mid-sentence: "accordion", but "GOV.UK header" keeps its case. */
  lowerName = computed(() => {
    const name = this.component()?.name ?? '';
    return /^[A-Z][a-z]/.test(name)
      ? name[0].toLowerCase() + name.slice(1)
      : name;
  });

  /** For "documentation on accordions": breadcrumbs and details stay as they are. */
  pluralName = computed(() => {
    const plural = this.component()?.plural;
    if (plural) {
      return plural;
    }
    const name = this.lowerName();
    return name.endsWith('s') ? name : `${name}s`;
  });
}
