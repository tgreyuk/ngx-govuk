import {
  Component,
  computed,
  inject,
  input,
  booleanAttribute,
} from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';
import { NgxGovukUtilsService } from 'ngx-govuk';

/**
 * A task in a task list.
 *
 * Add it to an `li` inside `ul ngxGovukTaskList`. Set its `titleText`, and
 * `link` once users can start it. Put its status inside it: a
 * `strong ngxGovukTag` for a status users need to act on, such as
 * "Incomplete", or plain text, such as "Completed".
 *
 * The link's `aria-describedby` points to the hint and status, so screen
 * reader users hear them with the task's name.
 */
@Component({
  // GOV.UK's CSS needs each task to be an li directly inside the ul, so the
  // task is the li itself rather than an ngx-govuk- element around it.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[ngxGovukTaskListItem]',
  imports: [RouterLink],
  templateUrl: './task-list-item.component.html',
  host: {
    class: 'govuk-task-list__item',
    '[class.govuk-task-list__item--with-link]': '!!link()',
  },
})
export class NgxGovukTaskListItem {
  private id = inject(NgxGovukUtilsService).randomId('task-list');
  protected hintId = `${this.id}-hint`;
  protected statusId = `${this.id}-status`;

  /**
   * The task's name.
   */
  titleText = input.required<string>();

  /**
   * Where the task's link goes, as you'd give it to `routerLink`. Leave it
   * unset while users can't start the task, to show its name as text.
   */
  link = input<string | readonly unknown[] | UrlTree>();

  /**
   * Hint text, to tell users more about the task.
   */
  hint = input<string>();

  /**
   * Greys out the status, for a task users can't start yet, such as one
   * that depends on another task.
   */
  cannotStartYet = input(false, { transform: booleanAttribute });

  protected describedBy = computed(() =>
    this.hint() ? `${this.hintId} ${this.statusId}` : this.statusId,
  );
}
