import {
  Directive,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';

/**
 * Renders a breadcrumbs item and adds GOV.UK's link class to it, so users
 * don't have to.
 *
 * Used only inside this entry point; it isn't exported.
 */
@Directive({
  selector: '[ngxGovukBreadcrumbsLinkOutlet]',
})
export class NgxGovukBreadcrumbsLinkOutlet {
  private renderer = inject(Renderer2);
  private viewContainer = inject(ViewContainerRef);

  /** The item's template. */
  template = input.required<TemplateRef<unknown>>({
    alias: 'ngxGovukBreadcrumbsLinkOutlet',
  });

  constructor() {
    effect(() => {
      this.viewContainer.clear();
      const view = this.viewContainer.createEmbeddedView(this.template());
      for (const root of view.rootNodes) {
        if (root instanceof Element) {
          this.renderer.addClass(root, 'govuk-breadcrumbs__link');
        }
      }
    });
  }
}
