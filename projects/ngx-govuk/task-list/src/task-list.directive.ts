import { Directive } from '@angular/core';

/**
 * Shows users the tasks they need to complete, and the status of each.
 *
 * Add it to a `ul` element, and add each task as an
 * `li ngxGovukTaskListItem` inside it.
 */
@Directive({
  selector: 'ul[ngxGovukTaskList]',
  host: { class: 'govuk-task-list' },
})
export class NgxGovukTaskList {}
