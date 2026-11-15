import { Component, contentChildren } from '@angular/core';
import { NgxGovukBreadcrumbsItem } from './breadcrumbs-item.directive';
import { NgxGovukBreadcrumbsLinkOutlet } from './breadcrumbs-link-outlet.directive';

/**
 * Shows users where they are in a website and lets them move up its structure.
 *
 * Put an `a` with `*ngxGovukBreadcrumbsItem` inside it for each level,
 * starting from the top. The links can come from `@for`.
 */
@Component({
  selector: 'ngx-govuk-breadcrumbs',
  imports: [NgxGovukBreadcrumbsLinkOutlet],
  templateUrl: './breadcrumbs.component.html',
})
export class NgxGovukBreadcrumbs {
  protected items = contentChildren(NgxGovukBreadcrumbsItem);
}
