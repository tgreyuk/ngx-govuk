import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * One link in the breadcrumbs, inside `ngx-govuk-breadcrumbs`.
 *
 * Add it to an `a` element with a `*`, as in
 * `<a *ngxGovukBreadcrumbsItem routerLink="/">Home</a>`. The breadcrumbs put
 * each link in its own list item and style it.
 */
@Directive({
  selector: '[ngxGovukBreadcrumbsItem]',
})
export class NgxGovukBreadcrumbsItem {
  /** @internal */
  readonly template = inject(TemplateRef);
}
