import {
  Component,
  booleanAttribute,
  contentChildren,
  input,
} from '@angular/core';
import { NgxGovukBreadcrumbsItem } from './breadcrumbs-item.directive';
import { NgxGovukBreadcrumbsLinkOutlet } from './breadcrumbs-link-outlet.directive';

/**
 * Shows users where they are in a website and lets them move up its structure.
 *
 * Add it to a `nav` element. Put an `a` with `*ngxGovukBreadcrumbsItem`
 * inside it for each level,
 * starting from the top. The links can come from `@for`.
 */
@Component({
  // A component rather than a directive, so it can render the list. It keeps
  // the native element and all its attributes, as a directive would.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nav[ngxGovukBreadcrumbs]',
  imports: [NgxGovukBreadcrumbsLinkOutlet],
  templateUrl: './breadcrumbs.component.html',
  host: {
    class: 'govuk-breadcrumbs',
    '[class.govuk-breadcrumbs--collapse-on-mobile]': 'collapseOnMobile()',
    '[class.govuk-breadcrumbs--inverse]': 'inverse()',
    '[attr.aria-label]': 'labelText()',
  },
})
export class NgxGovukBreadcrumbs {
  protected items = contentChildren(NgxGovukBreadcrumbsItem);

  /**
   * Shows only the first and last links on small screens, so long breadcrumbs
   * don't wrap onto several lines.
   */
  collapseOnMobile = input(false, { transform: booleanAttribute });

  /**
   * Shows the breadcrumbs in white, for use on a dark background.
   */
  inverse = input(false, { transform: booleanAttribute });

  /**
   * The label screen readers announce for the breadcrumbs.
   */
  labelText = input('Breadcrumb');
}
