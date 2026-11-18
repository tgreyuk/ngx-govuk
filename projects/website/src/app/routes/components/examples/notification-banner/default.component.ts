import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgxGovukNotificationBanner,
  NgxGovukNotificationBannerHeading,
  NgxGovukNotificationBannerLink,
} from 'ngx-govuk/notification-banner';

@Component({
  selector: 'app-notification-banner-demo',
  imports: [
    RouterLink,
    NgxGovukNotificationBanner,
    NgxGovukNotificationBannerHeading,
    NgxGovukNotificationBannerLink,
  ],
  templateUrl: './default.component.html',
})
export class NotificationBannerDemoComponent {}
