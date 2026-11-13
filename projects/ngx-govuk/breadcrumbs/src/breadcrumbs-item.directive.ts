import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core';

/**
 * One link in the breadcrumbs, inside `ngx-govuk-breadcrumbs`.
 *
 * Add it to an `a` element. It wraps the link in the list item the
 * breadcrumbs need.
 */
@Directive({
  selector: 'a[ngxGovukBreadcrumbsItem]',
  host: { class: 'govuk-breadcrumbs__link' },
})
export class NgxGovukBreadcrumbsItem implements AfterViewInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    const el = this.elementRef.nativeElement;
    const wrapper = this.renderer.createElement('li');
    wrapper.className = 'govuk-breadcrumbs__list-item';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
}
