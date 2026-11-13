import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { NGX_GOVUK_FIELD, NgxGovukField } from 'ngx-govuk';

/**
 * Directive to be added to native textarea elements.
 *
 * Use it inside `ngx-govuk-form-group` to add a label, hint and error message.
 */
@Directive({
  selector: 'textarea[ngxGovukTextarea]',
  host: {
    class: 'govuk-textarea',
    '[class.govuk-textarea--error]': 'hasError()',
  },
  providers: [
    {
      provide: NGX_GOVUK_FIELD,
      useExisting: forwardRef(() => NgxGovukTextarea),
    },
  ],
})
export class NgxGovukTextarea implements NgxGovukField, OnInit {
  elementRef = inject<ElementRef<HTMLTextAreaElement>>(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * Set by `ngx-govuk-form-group` when it has an error message.
   *
   * @internal
   */
  hasError = signal(false);

  get field(): HTMLTextAreaElement {
    return this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    // GOV.UK Frontend's default; a rows attribute you set is kept.
    if (!this.field.hasAttribute('rows')) {
      this.renderer.setAttribute(this.field, 'rows', '5');
    }
  }
}
