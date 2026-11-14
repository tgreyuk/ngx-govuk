import {
  afterNextRender,
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
  },
})
export class NgxGovukCookieBannerMessage {
  private element = inject<ElementRef<HTMLElement>>(ElementRef);

  /** The message's heading, such as "Cookies on [service name]". */
  heading = input<string>();

  /**
   * Marks the message as confirming users' choice. Screen readers announce
   * it, and focus moves to it when it's shown.
   */
  confirmation = input(false, { transform: booleanAttribute });

  constructor() {
    afterNextRender(() => {
      if (this.confirmation()) {
        this.element.nativeElement.focus();
      }
    });
  }
}
