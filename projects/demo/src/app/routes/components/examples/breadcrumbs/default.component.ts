import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NgxGovukBreadcrumbs,
  NgxGovukBreadcrumbsItem,
} from 'ngx-govuk/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs-demo',
  imports: [RouterModule, NgxGovukBreadcrumbs, NgxGovukBreadcrumbsItem],
  templateUrl: './default.component.html',
})
export class BreadcrumbsDemoComponent {}
