import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgxGovukBreadcrumbs,
  NgxGovukBreadcrumbsItem,
} from 'ngx-govuk/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs-demo',
  imports: [RouterLink, NgxGovukBreadcrumbs, NgxGovukBreadcrumbsItem],
  templateUrl: './default.component.html',
})
export class BreadcrumbsDemoComponent {}
