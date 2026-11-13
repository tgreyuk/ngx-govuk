import { Directive, computed, input } from '@angular/core';

/**
 * Shows users the status of something, such as "Completed" or "In progress".
 *
 * Add it to a `strong` element and put the status inside it.
 */
@Directive({
  selector: 'strong[ngxGovukTag]',
  host: { '[class]': 'classes()' },
})
export class NgxGovukTag {
  /**
   * The tag's colour. Leave it unset for blue. Use colours consistently, so
   * each one always means the same status.
   */
  colour = input<
    | 'grey'
    | 'green'
    | 'teal'
    | 'purple'
    | 'magenta'
    | 'red'
    | 'orange'
    | 'yellow'
  >();

  protected classes = computed(() =>
    this.colour() ? `govuk-tag govuk-tag--${this.colour()}` : 'govuk-tag',
  );
}
