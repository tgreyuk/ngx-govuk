import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxGovukBreadcrumbItem]',
  standalone: true,
})
export class NgxGovukBreadcrumbItemDirective implements AfterViewInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const el = this.elementRef.nativeElement;
    const wrapper = document.createElement('li');
    wrapper.className = 'govuk-breadcrumbs__list-item';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
}
