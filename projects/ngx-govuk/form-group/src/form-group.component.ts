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
 * Wraps a form field with its label, hint and error message, and connects
 * them for assistive technology, as GOV.UK Frontend's macros do.
 *
 * Place a single field directive inside it, such as an `input` with
 * `ngxGovukTextInput` or a `textarea` with `ngxGovukTextarea`. The field keeps
 * all its native attributes. Give it an `id`; one is generated if missing.
 *
 * The hint and error message get ids based on the field's id (`<id>-hint`,
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
   * The label text.
   */
  label = input.required<string>();

  /**
   * The label size. Defaults to `l` when the label is the page heading.
   */
  labelSize = input<'s' | 'm' | 'l' | 'xl'>();

  /**
   * If you're asking just one question, set the label as the page heading.
   */
  asPageHeading = input<boolean>(false);

  /**
   * Hint text that gives help with the question.
   */
  hint = input<string>();

  /**
   * The error message. When set, the form group and field show their error
   * styles. Set it when your validation fails, for example after the form is
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

  hintId = computed(() => `${this.fieldId()}-hint`);
  errorId = computed(() => `${this.fieldId()}-error`);

  labelClasses = computed(() => {
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
