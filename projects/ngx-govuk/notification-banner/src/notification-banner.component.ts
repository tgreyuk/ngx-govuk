import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  booleanAttribute,
} from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';

/**
 * Tells users about something important that isn't directly related to the
 * page, or confirms the outcome of something they've just done.
 *
 * Put the content inside it. For a single line, use a
 * `p class="govuk-notification-banner__heading"`.
 */
@Component({
  selector: 'ngx-govuk-notification-banner',
  templateUrl: './notification-banner.component.html',
  host: {
    class: 'govuk-notification-banner',
    '[class.govuk-notification-banner--success]': 'isSuccess()',
    '[attr.role]': "isSuccess() ? 'alert' : 'region'",
    '[attr.aria-labelledby]': 'titleId()',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':host(:not([hidden])) { display: block; }',
})
export class NgxGovukNotificationBanner {
  /**
   * Set to `success` to confirm that something users did has worked. A
   * success banner is green, and it's announced and focused when the page
   * loads. Leave it unset for important information.
   */
  bannerType = input<'success'>();

  /**
   * The title in the banner's coloured bar. Defaults to "Success" for a
   * success banner and "Important" otherwise.
   */
  titleText = input<string>();

  /**
   * The level of the title's heading.
   */
  titleHeadingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(2);

  /**
   * The id of the title, which labels the banner. Leave it unset for a
   * unique id.
   */
  titleId = input<string>(
    inject(NgxGovukUtilsService).randomId('govuk-notification-banner-title'),
  );

  /**
   * Stops a success banner taking focus when the page loads. Only use it if
   * something else on the page needs focus.
   */
  disableAutoFocus = input(false, { transform: booleanAttribute });

  private banner = inject<ElementRef<HTMLElement>>(ElementRef);

  protected isSuccess = computed(() => this.bannerType() === 'success');

  protected title = computed(
    () => this.titleText() ?? (this.isSuccess() ? 'Success' : 'Important'),
  );

  constructor() {
    // As GOV.UK Frontend does: focus a success banner, so screen reader users
    // hear it and keyboard users start from it.
    afterNextRender(() => {
      if (this.isSuccess() && !this.disableAutoFocus()) {
        this.focus(this.banner.nativeElement);
      }
    });
  }

  private focus(element: HTMLElement) {
    const hadTabindex = element.hasAttribute('tabindex');
    if (!hadTabindex) {
      element.setAttribute('tabindex', '-1');
      element.addEventListener(
        'blur',
        () => element.removeAttribute('tabindex'),
        { once: true },
      );
    }
    element.focus();
  }
}
