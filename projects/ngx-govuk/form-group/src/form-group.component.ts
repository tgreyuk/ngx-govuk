import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  Renderer2,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { NGX_GOVUK_FIELD, NgxGovukUtilsService } from 'ngx-govuk';

/**
 * Adds a label, hint and error message to a form field, and connects them for
 * assistive technology, as GOV.UK Frontend's macros do.
 *
 * Put one field inside it, such as an `input` with `ngxGovukTextInput` or a
 * `textarea` with `ngxGovukTextarea`. The field keeps its own attributes. Give
 * it an `id`, or one is generated.
 *
 * The hint and error message get ids based on the field's id (`<id>-hint` and
 * `<id>-error`), and the field's `aria-describedby` points to them.
 */
@Component({
  selector: 'ngx-govuk-form-group',
  imports: [NgTemplateOutlet],
  templateUrl: './form-group.component.html',
})
export class NgxGovukFormGroup implements AfterContentInit {
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
  asPageHeading = input<boolean>(false);

  /**
   * Hint text, to help users answer the question.
   */
  hint = input<string>();

  /**
   * The error message. When it's set, the form group and its field show their
   * error styles. Set it when validation fails, such as after the form is
   * submitted, as GOV.UK recommends.
   */
  errorMessage = input<string | null>();

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
      this.errorMessage() ? this.errorId() : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

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

  ngAfterContentInit(): void {
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
  }
}
