import { ElementRef, Renderer2 } from '@angular/core';
import { NgxGovukBreadcrumbItemDirective } from './breadcrumb-item.directive';

describe('NgxGovukBreadcrumbItemDirective', () => {
  it('should create an instance', () => {
    const renderer = {} as Renderer2; // Replace {} with the actual Renderer2 instance
    const elementRef = {} as ElementRef; // Replace {} with the actual ElementRef instance
    const directive = new NgxGovukBreadcrumbItemDirective(renderer, elementRef);
    expect(directive).toBeTruthy();
  });
});
