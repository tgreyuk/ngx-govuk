import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'textarea[ngxGovukTextarea]',
  standalone: true,
})
export class NgxGovukTextareaDirective implements AfterViewInit {
  @HostBinding('class') get className() {
    return `govuk-textarea`;
  }
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const field = this.elementRef.nativeElement;
    if (field) {
      this.renderer.setAttribute(field, 'rows', '5');
    }
  }
}
