import { Component } from '@angular/core';
import {
  NgxGovukNotificationBanner,
  NgxGovukNotificationBannerHeading,
  NgxGovukNotificationBannerLink,
} from 'ngx-govuk/notification-banner';

@Component({
  selector: 'app-notification-banner-success-demo',
  imports: [
    NgxGovukNotificationBanner,
    NgxGovukNotificationBannerHeading,
    NgxGovukNotificationBannerLink,
  ],
  templateUrl: './success.component.html',
})
export class NotificationBannerSuccessDemoComponent {}
