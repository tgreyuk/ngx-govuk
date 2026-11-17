import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Renderer2,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  booleanAttribute,
} from '@angular/core';
import { NGX_GOVUK_FIELD, NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';

/**
 * Adds a label and hint to a form field, and connects them and any error
 * message for assistive technology, as GOV.UK Frontend's macros do.
 *
 * Put one field inside it, such as an `input` with `ngxGovukTextInput` or a
 * `textarea` with `ngxGovukTextarea`. The field keeps its own attributes. Give
 * it an `id`, or one is generated. To show an error, put a `p` with
 * `ngxGovukErrorMessage` inside it too: it goes between the hint and the field.
 *
 * The hint and error message get ids based on the field's id (`<id>-hint` and
 * `<id>-error`), and the field's `aria-describedby` points to them.
 */
@Component({
  selector: 'ngx-govuk-form-group',
  imports: [NgTemplateOutlet],
  templateUrl: './form-group.component.html',
  host: {
    class: 'govuk-form-group',
    '[class.govuk-form-group--error]': '!!errorMessage()',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':host(:not([hidden])) { display: block; }',
})
export class NgxGovukFormGroup {
  private renderer = inject(Renderer2);
  private utilsService = inject(NgxGovukUtilsService);
  private field = contentChild(NGX_GOVUK_FIELD);

  /**
   * The field's label.
   */
  label = input.required<string>();

  /**
   * The label's size. When unset, the label is `l` if it's the page heading,
   * and body size otherwise.
   */
  labelSize = input<'s' | 'm' | 'l' | 'xl'>();

  /**
   * Makes the label the page heading. Use it when the page asks just one
   * question.
   */
  asPageHeading = input(false, { transform: booleanAttribute });

  /**
   * Hint text, to help users answer the question.
   */
  hint = input<string>();

  /**
   * Text shown before the field, such as `£`.
   */
  prefix = input<string>();

  /**
   * Text shown after the field, such as `per item`.
   */
  suffix = input<string>();

  /**
   * The field's id: its own, or a generated one if it has none.
   *
   * @internal
   */
  fieldId = signal('');

  protected hintId = computed(() => `${this.fieldId()}-hint`);
  protected errorId = computed(() => `${this.fieldId()}-error`);

  /** The projected error message, if there is one. */
  protected errorMessage = contentChild(NgxGovukErrorMessage, {
    descendants: false,
  });

  /** Gives the projected error message the id GOV.UK Frontend uses. */
  private linkErrorMessage = effect(() =>
    this.errorMessage()?.fieldErrorId.set(this.errorId()),
  );

  protected labelClasses = computed(() => {
    const size = this.labelSize() ?? (this.asPageHeading() ? 'l' : undefined);
    return size ? `govuk-label govuk-label--${size}` : 'govuk-label';
  });

  /** Any aria-describedby the field already had, kept first as GOV.UK does. */
  private initialDescribedBy = signal('');

  private describedBy = computed(() =>
    [
      this.initialDescribedBy(),
      this.hint() ? this.hintId() : '',
      this.errorMessage()?.id() ?? '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  /**
   * Sets up the field once it's rendered, which can be after the form group,
   * such as when it's inside `@if`.
   */
  private setUpField = effect(() => {
    const element = this.field()?.elementRef.nativeElement;
    if (!element) {
      return;
    }
    this.initialDescribedBy.set(element.getAttribute('aria-describedby') ?? '');
    if (!element.id) {
      this.renderer.setAttribute(
        element,
        'id',
        this.utilsService.randomId('field'),
      );
    }
    this.fieldId.set(element.id);
  });

  constructor() {
    effect(() => {
      const field = this.field();
      const element = field?.elementRef.nativeElement;
      if (!field || !element || !this.fieldId()) {
        return;
      }
      field.hasError.set(!!this.errorMessage());
      const describedBy = this.describedBy();
      if (describedBy) {
        this.renderer.setAttribute(element, 'aria-describedby', describedBy);
      } else {
        this.renderer.removeAttribute(element, 'aria-describedby');
      }
    });
  }
}
