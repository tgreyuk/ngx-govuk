import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

/**
 * Directive to be added to native "a" elements to render as GOV.UK breadcrumb items.
 *
 * @selector a[ngxGovukBreadcrumbItem]
 */
@Directive({
  selector: 'a[ngxGovukBreadcrumbsItem]',
  standalone: true,
})
export class NgxGovukBreadcrumbsItem implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    const el = this.elementRef.nativeElement;
    const wrapper = this.renderer.createElement('li');
    wrapper.className = 'govuk-breadcrumbs__list-item';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
}
