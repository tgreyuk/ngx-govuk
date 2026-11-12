import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Directive({
  selector: '[ngxGovukTabLink]',
  standalone: true,
})
export class NgxGovukTabLinkDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private routerLinkActive = inject(RouterLinkActive);
  private renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    const nativeLinkEl = this.el.nativeElement;
    const listItem = this.renderer.createElement('li');
    const parent = nativeLinkEl.parentNode;
    this.renderer.addClass(nativeLinkEl, 'govuk-tabs__tab');
    this.renderer.addClass(listItem, 'govuk-tabs__list-item');
    this.renderer.insertBefore(parent, listItem, nativeLinkEl);
    this.renderer.appendChild(listItem, nativeLinkEl);
    this.routerLinkActive?.isActiveChange.subscribe((isActive) => {
      if (isActive) {
        this.renderer.addClass(listItem, 'govuk-tabs__list-item--selected');
      } else {
        this.renderer.removeClass(listItem, 'govuk-tabs__list-item--selected');
      }
    });
  }
}
