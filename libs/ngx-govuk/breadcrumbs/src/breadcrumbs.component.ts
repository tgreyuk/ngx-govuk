import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * The breadcrumbs wrapping component.
 *
 * Expects x number of anchor elements with the directive ngxGovukBreadcrumbItem in the content slot.
 *
 * @selector ngx-govuk-breadcrumbs
 *
 */
@Component({
  selector: 'ngx-govuk-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
})
export class NgxGovukBreadcrumbs {}
