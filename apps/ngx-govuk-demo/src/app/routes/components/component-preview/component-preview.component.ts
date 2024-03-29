import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AccordionDemoComponent } from '../examples/accordion.component';
import { BackLinkDemoComponent } from '../examples/back-link.component';
import { BreadcrumbsDemoComponent } from '../examples/breadcrumbs.component';
import { ButtonDemoComponent } from '../examples/button.component';
import { DetailsDemoComponent } from '../examples/details.component';
import { FormGroupDemoComponent } from '../examples/form-group.component';
import { TextInputDemoComponent } from '../examples/text-input.component';

@Component({
  selector: 'ngx-govuk-example',
  standalone: true,
  imports: [CommonModule, AccordionDemoComponent],
  templateUrl: './component-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPreviewComponent {
  componentId = input<string>();

  demoComponents = {
    ['accordion']: AccordionDemoComponent,
    ['back-link']: BackLinkDemoComponent,
    ['breadcrumbs']: BreadcrumbsDemoComponent,
    ['button']: ButtonDemoComponent,
    ['details']: DetailsDemoComponent,
    ['form-group']: FormGroupDemoComponent,
    ['text-input']: TextInputDemoComponent,
  };

  get demoComponent() {
    return this.demoComponents[
      this.componentId() as keyof typeof this.demoComponents
    ];
  }
}
