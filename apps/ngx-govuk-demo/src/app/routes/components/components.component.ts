import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngx-govuk-components',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {
  components: { name: string; routerLink?: string; completed?: boolean }[] = [
    { name: 'Accordion', routerLink: 'accordion', completed: true },
    { name: 'Back Link' },
    { name: 'Breadcrumbs' },
    { name: 'Button' },
    { name: 'Character count' },
    { name: 'Checkboxes' },
    { name: 'Cookie banner' },
    { name: 'Date input' },
    { name: 'Details' },
    { name: 'Error message' },
    { name: 'Error summary' },
    { name: 'Exit this page' },
    { name: 'Fieldset' },
    { name: 'File upload' },
    { name: 'Footer' },
    { name: 'Header' },
    { name: 'Inset text' },
    { name: 'Notification banner' },
    { name: 'Pagination' },
    { name: 'Panel' },
    { name: 'Phase banner' },
    { name: 'Radios' },
    { name: 'Select' },
    { name: 'Skip link' },
    { name: 'Summary list' },
    { name: 'Table' },
    { name: 'Tabs', routerLink: 'tabs', completed: true },
    { name: 'Tag' },
    { name: 'Task list' },
    { name: 'Text input' },
    { name: 'Textarea' },
    { name: 'Warning text' },
  ];
}
