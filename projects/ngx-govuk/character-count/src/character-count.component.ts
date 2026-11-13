import {
  AfterContentInit,
  Component,
  DestroyRef,
  Renderer2,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

/** How long users stop typing before screen readers hear the count. */
const SCREEN_READER_DELAY = 1000;

/**
 * Tells users how many characters they can still enter in a textarea.
 *
 * Use it in place of `ngx-govuk-form-group`: put a `textarea` with
 * `ngxGovukTextarea` inside it, and it adds the label, hint, error message
 * and count. Users can type past the limit, and the count tells them how many
 * characters to remove, as GOV.UK recommends. Check the length when the form
 * is submitted too.
 *
 * The textarea keeps its own `id`, or one is generated. The hint, error
 * message and count get ids based on it.
 */
@Component({
  selector: 'ngx-govuk-character-count',
  templateUrl: './character-count.component.html',
})
export class NgxGovukCharacterCount implements AfterContentInit {
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);
  private utilsService = inject(NgxGovukUtilsService);
  private textarea = contentChild(NgxGovukTextarea);
  private control = contentChild(NgControl, { descendants: true });

  /**
   * The textarea's label.
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
   * The error message. When it's set, the character count and its textarea
   * show their error styles. Set it when validation fails, such as after the
   * form is submitted.
   */
  errorMessage = input<string | null>();

  /**
   * The most characters users should enter.
   */
  maxLength = input.required<number>();

  /**
   * Hides the count until users have typed this percentage of `maxLength`,
   * such as `75`.
   */
  threshold = input<number>();

  protected fieldId = signal('');
  protected hintId = computed(() => `${this.fieldId()}-hint`);
  protected errorId = computed(() => `${this.fieldId()}-error`);
  protected infoId = computed(() => `${this.fieldId()}-info`);

  protected labelClasses = computed(() => {
    const size = this.labelSize() ?? (this.asPageHeading() ? 'l' : undefined);
    return size ? `govuk-label govuk-label--${size}` : 'govuk-label';
  });

  private length = signal(0);
  private screenReaderLength = signal(0);
  private screenReaderTimer?: ReturnType<typeof setTimeout>;

  protected remaining = computed(() => this.maxLength() - this.length());
  protected overLimit = computed(() => this.remaining() < 0);
  protected belowThreshold = computed(() => {
    const threshold = this.threshold();
    return !!threshold && this.length() < (this.maxLength() * threshold) / 100;
  });
  protected message = computed(() => countMessage(this.remaining()));
  protected screenReaderMessage = computed(() =>
    countMessage(this.maxLength() - this.screenReaderLength()),
  );

  /** Any aria-describedby the textarea already had, kept first as GOV.UK does. */
  private initialDescribedBy = signal('');

  private describedBy = computed(() =>
    [
      this.initialDescribedBy(),
      this.infoId(),
      this.hint() ? this.hintId() : '',
      this.errorMessage() ? this.errorId() : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  constructor() {
    effect(() => {
      const textarea = this.textarea();
      if (!textarea || !this.fieldId()) {
        return;
      }
      textarea.hasError.set(!!this.errorMessage() || this.overLimit());
      this.renderer.setAttribute(
        textarea.elementRef.nativeElement,
        'aria-describedby',
        this.describedBy(),
      );
    });

    this.destroyRef.onDestroy(() => clearTimeout(this.screenReaderTimer));
  }

  ngAfterContentInit(): void {
    const element = this.textarea()?.elementRef.nativeElement;
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

    const count = () => this.count(element.value.length);
    this.renderer.listen(element, 'input', count);
    // A form control can change the value without an input event.
    this.control()
      ?.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(count);
    this.length.set(element.value.length);
    this.screenReaderLength.set(element.value.length);
  }

  private count(length: number): void {
    this.length.set(length);
    clearTimeout(this.screenReaderTimer);
    this.screenReaderTimer = setTimeout(
      () => this.screenReaderLength.set(length),
      SCREEN_READER_DELAY,
    );
  }
}

/** GOV.UK Frontend's count message, such as `You have 5 characters remaining`. */
function countMessage(remaining: number): string {
  const count = Math.abs(remaining);
  const characters = count === 1 ? 'character' : 'characters';
  return remaining < 0
    ? `You have ${count} ${characters} too many`
    : `You have ${count} ${characters} remaining`;
}
