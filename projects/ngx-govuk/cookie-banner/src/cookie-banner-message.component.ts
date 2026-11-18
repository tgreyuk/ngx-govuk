import {
  afterRenderEffect,
  booleanAttribute,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';

/**
 * A message in the cookie banner, such as the question asking users to
 * accept or reject cookies, or the confirmation of their choice.
 *
 * Add it to a `div` inside `ngx-govuk-cookie-banner`. Put the message's
 * paragraphs inside it, with the `govuk-body` class, and its buttons and
 * links in `ngx-govuk-button-group`.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'div[ngxGovukCookieBannerMessage]',
  templateUrl: './cookie-banner-message.component.html',
  host: {
    class: 'govuk-cookie-banner__message govuk-width-container',
    '[attr.role]': 'confirmation() ? "alert" : null',
    '[attr.tabindex]': 'confirmation() ? "-1" : null',
    '[attr.hidden]': 'hidden() ? "" : null',
  },
})
export class NgxGovukCookieBannerMessage {
  private element = inject<ElementRef<HTMLElement>>(ElementRef);

  /** The message's heading, such as "Cookies on [service name]". */
  headingText = input<string>();

  /**
   * Marks the message as confirming users' choice. Screen readers announce
   * it, and focus moves to it when it's shown.
   */
  confirmation = input(false, { transform: booleanAttribute });

  /**
   * Hides the message. Use it to keep a message in the page and show it
   * later, such as the confirmation once users have chosen.
   */
  hidden = input(false, { transform: booleanAttribute });

  constructor() {
    // Runs again whenever either changes, so focus moves to a confirmation
    // when it's first rendered, when it's unhidden, or when a message
    // becomes one.
    afterRenderEffect(() => {
      if (this.confirmation() && !this.hidden()) {
        this.element.nativeElement.focus();
      }
    });
  }
}
