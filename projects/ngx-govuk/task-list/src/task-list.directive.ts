import { Directive } from '@angular/core';

/**
 * Displays all the tasks a user needs to do, and lets users see which ones
 * are done and which they still need to do.
 *
 * Add it to a `ul` element, and add each task as an
 * `li ngxGovukTaskListItem` inside it.
 */
@Directive({
  selector: 'ul[ngxGovukTaskList]',
  host: { class: 'govuk-task-list' },
})
export class NgxGovukTaskList {}
