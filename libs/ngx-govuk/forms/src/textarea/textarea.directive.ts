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

  get field() {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.field) {
      this.renderer.setAttribute(this.field, 'rows', '5');
    }
  }
}
