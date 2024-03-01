import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NgxGovukBreadcrumbs,
  NgxGovukBreadcrumbsItem,
} from 'ngx-govuk/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxGovukBreadcrumbs,
    NgxGovukBreadcrumbsItem,
  ],
  template: `
    <ngx-govuk-breadcrumbs>
      <a ngxGovukBreadcrumbsItem [routerLink]="['.']">Home</a>
      <a ngxGovukBreadcrumbsItem [routerLink]="['.']"
        >Passports, travel and living abroad</a
      >
      <a ngxGovukBreadcrumbsItem [routerLink]="['.']">Travel abroad</a>
    </ngx-govuk-breadcrumbs>
  `,
})
export class BreadcrumbsDemoComponent {}
