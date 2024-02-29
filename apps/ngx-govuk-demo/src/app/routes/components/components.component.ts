import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StartCasePipe } from '../../pipes/start-case.pipe';

@Component({
  selector: 'ngx-govuk-components',
  standalone: true,
  imports: [CommonModule, RouterLink, StartCasePipe],
  templateUrl: './components.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {
  components: { name: string; id?: string; completed?: boolean }[] = [
    { name: 'Accordion', id: 'accordion', completed: true },
    { name: 'Back Link' },
    { name: 'Breadcrumbs' },
    { name: 'Button', id: 'button', completed: true },
    { name: 'Character count' },
    { name: 'Checkboxes' },
    { name: 'Cookie banner' },
    { name: 'Date input' },
    { name: 'Details', id: 'details', completed: true },
    { name: 'Error message' },
    { name: 'Error summary' },
    { name: 'Exit this page' },
    { name: 'Fieldset' },
    { name: 'File upload' },
    { name: 'Footer' },
    { name: 'Form Group', id: 'form-group', completed: true },
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
    { name: 'Tabs' },
    { name: 'Tag' },
    { name: 'Task list' },
    { name: 'Text input', id: 'text-input', completed: true },
    { name: 'Textarea' },
    { name: 'Warning text' },
  ];
}
