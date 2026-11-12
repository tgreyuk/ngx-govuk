import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Renderer2,
  inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'textarea[ngxGovukTextarea]',
})
export class NgxGovukTextarea implements AfterViewInit {
  control = inject(NgControl, { optional: true, self: true });
  elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostBinding('class') get className() {
    return `govuk-textarea`;
  }

  @HostBinding('class.govuk-textarea--error') get isInvalidClass() {
    return this.control?.status === 'INVALID';
  }

  get field() {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.field) {
      this.renderer.setAttribute(this.field, 'rows', '5');
    }
  }
}
