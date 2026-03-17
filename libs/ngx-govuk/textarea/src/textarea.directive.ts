import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Optional,
  Renderer2,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'textarea[ngxGovukTextarea]',
  standalone: true,
})
export class NgxGovukTextarea implements AfterViewInit {
  @HostBinding('class') get className() {
    return `govuk-textarea`;
  }

  @HostBinding('class.govuk-input--error') get isInvalidClass() {
    return this.control?.status === 'INVALID';
  }

  constructor(
    @Optional() @Self() public control: NgControl,
    public elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  get field() {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.field) {
      this.renderer.setAttribute(this.field, 'rows', '5');
    }
  }
}
