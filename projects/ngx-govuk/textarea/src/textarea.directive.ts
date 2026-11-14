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
 * Styles a `textarea` element as a GOV.UK textarea.
 *
 * Put it inside `ngx-govuk-form-group`, which adds its label, hint and error
 * message. It's 5 rows high unless you set `rows`.
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
  /** @internal */
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
