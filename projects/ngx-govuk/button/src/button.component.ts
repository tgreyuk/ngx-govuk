import {
  Component,
  ElementRef,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

/**
 * Styles a `button` or `a` element as a GOV.UK button.
 *
 * Use a `button` for actions, such as saving answers, and an `a` for links
 * that look like buttons, such as a start button.
 */
@Component({
  // A component rather than a directive, so it can render the start icon. It
  // keeps the native element and all its attributes, as a directive would.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[ngxGovukButton], button[ngxGovukButton]',
  templateUrl: './button.component.html',
  host: {
    class: 'govuk-button',
    '[class.govuk-button--secondary]': "buttonType() === 'secondary'",
    '[class.govuk-button--warning]': "buttonType() === 'warning'",
    '[class.govuk-button--start]': "buttonType() === 'start'",
    '[class.govuk-button--inverse]': 'inverse()',
    '[attr.role]': "isLink ? 'button' : null",
    '[attr.draggable]': "isLink ? 'false' : null",
    '[attr.disabled]': "!isLink && disabled() ? '' : null",
    '[attr.aria-disabled]': "!isLink && disabled() ? 'true' : null",
    '(keydown.space)': 'onSpace($event)',
  },
})
export class NgxGovukButton {
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** Whether the button is a link, which GOV.UK gives a button's role. */
  protected readonly isLink = this.host.tagName === 'A';

  /**
   * The kind of button: `secondary` for less important actions, `warning` for
   * actions that delete something or can't be undone, and `start` for the
   * button that starts a service. Leave it unset for the main action on a
   * page.
   *
   * A start button removes the spaces between elements inside it. If its
   * text includes other elements, such as `strong`, wrap all of it in a
   * `span`.
   */
  buttonType = input<'secondary' | 'warning' | 'start'>();

  /**
   * Shows the button in white, for use on a dark background.
   */
  inverse = input(false, { transform: booleanAttribute });

  /**
   * Disables the button, and tells screen readers it's disabled. Has no
   * effect on a link.
   */
  disabled = input(false, { transform: booleanAttribute });

  /** Lets the Space key select a link, as it does a button. */
  protected onSpace(event: Event) {
    if (!this.isLink) return;
    event.preventDefault();
    this.host.click();
  }
}
