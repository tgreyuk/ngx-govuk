import {
  Component,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Explains what went wrong with an answer and how to fix it.
 *
 * Put it on a `p` element, with the message as its content. Show it only when
 * validation fails, such as with `@if` after the form is submitted.
 *
 * Inside `ngx-govuk-form-group`, `ngx-govuk-radios`, `ngx-govuk-checkboxes`,
 * `ngx-govuk-date-input`, `ngx-govuk-character-count` or
 * `ngx-govuk-password-input`, it goes after the hint wherever you write it.
 * The field shows its error styles while it's there, and gets an id of
 * `<id>-error` that the field's `aria-describedby` points to. Anywhere else,
 * give it an `id` and add that to the field's `aria-describedby` yourself.
 */
@Component({
  // A component rather than a directive, so it can render the visually
  // hidden prefix. It keeps the native `p` and all its attributes.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'p[ngxGovukErrorMessage]',
  templateUrl: './error-message.component.html',
  host: {
    class: 'govuk-error-message',
    '[attr.id]': 'id()',
  },
})
export class NgxGovukErrorMessage {
  /** The `id` written on the element, which takes priority. */
  private readonly ownId =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.id || null;

  /**
   * The visually hidden text before the message, which screen readers
   * announce. A colon is added after it. Change it to translate it, such as
   * `Gwall` in Welsh, or set it to an empty string to leave it out.
   */
  visuallyHiddenText = input('Error');

  /**
   * The id a field sets, used when the element has none of its own.
   *
   * @internal
   */
  fieldErrorId = signal<string | null>(null);

  /**
   * The message's id.
   *
   * @internal
   */
  id = computed(() => this.ownId ?? this.fieldErrorId());
}
