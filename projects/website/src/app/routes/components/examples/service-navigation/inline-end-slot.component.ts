import { Component } from '@angular/core';
import { NgxGovukLanguageNavigation } from 'ngx-govuk/language-navigation';
import {
  NgxGovukServiceNavigation,
  NgxGovukServiceNavigationEnd,
} from 'ngx-govuk/service-navigation';

@Component({
  selector: 'app-service-navigation-inline-end-slot',
  imports: [
    NgxGovukServiceNavigation,
    NgxGovukServiceNavigationEnd,
    NgxGovukLanguageNavigation,
  ],
  templateUrl: './inline-end-slot.component.html',
})
export class ServiceNavigationInlineEndSlotDemoComponent {}
