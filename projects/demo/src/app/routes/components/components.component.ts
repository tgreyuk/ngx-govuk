import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * - documented: has a page on this site
 * - in-progress: exported by the library, but not documented here yet
 * - to-do: not built yet
 */
type ComponentStatus = 'documented' | 'in-progress' | 'to-do';

interface ComponentEntry {
  name: string;
  id: string;
  status: ComponentStatus;
}

@Component({
  selector: 'ngx-govuk-components',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './components.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {
  /** Mirrors https://design-system.service.gov.uk/components/ */
  components: ComponentEntry[] = [
    { name: 'Accordion', id: 'accordion', status: 'documented' },
    { name: 'Back link', id: 'back-link', status: 'documented' },
    { name: 'Breadcrumbs', id: 'breadcrumbs', status: 'documented' },
    { name: 'Button', id: 'button', status: 'documented' },
    { name: 'Character count', id: 'character-count', status: 'in-progress' },
    { name: 'Checkboxes', id: 'checkboxes', status: 'in-progress' },
    { name: 'Cookie banner', id: 'cookie-banner', status: 'to-do' },
    { name: 'Date input', id: 'date-input', status: 'in-progress' },
    { name: 'Details', id: 'details', status: 'documented' },
    { name: 'Error message', id: 'error-message', status: 'to-do' },
    { name: 'Error summary', id: 'error-summary', status: 'to-do' },
    { name: 'Exit this page', id: 'exit-this-page', status: 'to-do' },
    { name: 'Feedback', id: 'feedback', status: 'to-do' },
    { name: 'Fieldset', id: 'fieldset', status: 'in-progress' },
    { name: 'File upload', id: 'file-upload', status: 'to-do' },
    { name: 'Generic header', id: 'generic-header', status: 'to-do' },
    { name: 'GOV.UK footer', id: 'footer', status: 'to-do' },
    { name: 'GOV.UK header', id: 'header', status: 'to-do' },
    { name: 'Inset text', id: 'inset-text', status: 'to-do' },
    { name: 'Language navigation', id: 'language-navigation', status: 'to-do' },
    { name: 'Notification banner', id: 'notification-banner', status: 'to-do' },
    { name: 'Pagination', id: 'pagination', status: 'to-do' },
    { name: 'Panel', id: 'panel', status: 'to-do' },
    { name: 'Password input', id: 'password-input', status: 'to-do' },
    { name: 'Phase banner', id: 'phase-banner', status: 'to-do' },
    { name: 'Radios', id: 'radios', status: 'to-do' },
    { name: 'Select', id: 'select', status: 'to-do' },
    { name: 'Service navigation', id: 'service-navigation', status: 'to-do' },
    { name: 'Skip link', id: 'skip-link', status: 'to-do' },
    { name: 'Summary list', id: 'summary-list', status: 'to-do' },
    { name: 'Table', id: 'table', status: 'to-do' },
    { name: 'Tabs', id: 'tabs', status: 'in-progress' },
    { name: 'Tag', id: 'tag', status: 'to-do' },
    { name: 'Task list', id: 'task-list', status: 'to-do' },
    { name: 'Text input', id: 'text-input', status: 'documented' },
    { name: 'Textarea', id: 'textarea', status: 'in-progress' },
    { name: 'Warning text', id: 'warning-text', status: 'to-do' },
  ];

  /** Components this library adds on top of GOV.UK Frontend. */
  additionalComponents: ComponentEntry[] = [
    { name: 'Form group', id: 'form-group', status: 'documented' },
  ];

  private statusLabels: Record<ComponentStatus, string> = {
    documented: 'Available',
    'in-progress': 'In progress',
    'to-do': 'To do',
  };

  private statusClasses: Record<ComponentStatus, string> = {
    documented: 'govuk-tag--green',
    'in-progress': 'govuk-tag--blue',
    'to-do': 'govuk-tag--grey',
  };

  statusLabel(status: ComponentStatus): string {
    return this.statusLabels[status];
  }

  statusClass(status: ComponentStatus): string {
    return this.statusClasses[status];
  }
}
