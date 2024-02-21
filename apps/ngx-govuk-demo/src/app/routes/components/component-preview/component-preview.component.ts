import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AccordionDemoComponent } from '../examples/accordion.component';

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
    accordion: AccordionDemoComponent,
  };

  get demoComponent() {
    return this.demoComponents[
      this.componentId() as keyof typeof this.demoComponents
    ];
  }
}