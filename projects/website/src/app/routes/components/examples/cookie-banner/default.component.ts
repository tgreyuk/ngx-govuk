import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxGovukButton, NgxGovukButtonGroup } from 'ngx-govuk/button';
import {
  NgxGovukCookieBanner,
  NgxGovukCookieBannerMessage,
} from 'ngx-govuk/cookie-banner';

@Component({
  selector: 'app-cookie-banner-demo',
  imports: [
    RouterLink,
    NgxGovukButton,
    NgxGovukButtonGroup,
    NgxGovukCookieBanner,
    NgxGovukCookieBannerMessage,
  ],
  templateUrl: './default.component.html',
})
export class CookieBannerDemoComponent {
  /** Whether users accepted analytics cookies, once they've chosen. */
  protected choice = signal<boolean | undefined>(undefined);
  protected hidden = signal(false);

  protected choose(accepted: boolean) {
    // A real service would save the choice in a cookie here.
    this.choice.set(accepted);
  }
}
