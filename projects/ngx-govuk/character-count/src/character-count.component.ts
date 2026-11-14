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
 * What the character count counts: `length` for the text's `length`, as
 * the `maxlength` attribute does, `characters` for characters as users see
 * them, so an emoji counts as one, or `words`.
 */
export type NgxGovukCountType = 'length' | 'characters' | 'words';

/**
 * Tells users how many characters, or words, they can still enter in a
 * textarea.
 *
 * Use it in place of `ngx-govuk-form-group`: put a `textarea` with
 * `ngxGovukTextarea` inside it, and it adds the label, hint, error message
 * and count. Users can type past the limit, and the count tells them how many
 * characters or words to remove, as GOV.UK recommends. Check the length when
 * the form is submitted too, counting the same way.
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
   * The most characters users should enter, or words when `countType` is
   * `words`.
   */
  maxLength = input.required<number>();

  /**
   * What to count: `length` for the text's `length`, as the `maxlength`
   * attribute does, `characters` for characters as users see them, so an
   * emoji counts as one, or `words`.
   */
  countType = input<NgxGovukCountType>('length');

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

  private element?: HTMLTextAreaElement;
  private segmenters = new Map<NgxGovukCountType, Intl.Segmenter>();
  private value = signal('');
  private screenReaderValue = signal('');
  private length = computed(() => this.countOf(this.value()));
  private screenReaderTimer?: ReturnType<typeof setTimeout>;

  protected remaining = computed(() => this.maxLength() - this.length());
  protected overLimit = computed(() => this.remaining() < 0);
  protected belowThreshold = computed(() => {
    const threshold = this.threshold();
    return !!threshold && this.length() < (this.maxLength() * threshold) / 100;
  });
  protected unit = computed(() =>
    this.countType() === 'words' ? 'words' : 'characters',
  );
  protected message = computed(() =>
    countMessage(this.remaining(), this.unit()),
  );
  protected screenReaderMessage = computed(() =>
    countMessage(
      this.maxLength() - this.countOf(this.screenReaderValue()),
      this.unit(),
    ),
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

    this.element = element;
    const count = () => this.count(element.value);
    this.renderer.listen(element, 'input', count);
    // A form control can change the value without an input event.
    this.control()
      ?.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(count);
    this.value.set(element.value);
    this.screenReaderValue.set(element.value);
  }

  private count(value: string): void {
    this.value.set(value);
    clearTimeout(this.screenReaderTimer);
    this.screenReaderTimer = setTimeout(
      () => this.screenReaderValue.set(value),
      SCREEN_READER_DELAY,
    );
  }

  /** Counts the text as GOV.UK Frontend does for the count type. */
  private countOf(text: string): number {
    const countType = this.countType();
    if (countType === 'length') {
      return text.length;
    }
    const segmenter = this.segmenter(countType);
    if (!segmenter) {
      // Without Intl.Segmenter, count words between spaces and UTF-16 units.
      return countType === 'words'
        ? (text.match(/\S+/g)?.length ?? 0)
        : text.length;
    }
    const segments = Array.from(segmenter.segment(text));
    return countType === 'words'
      ? segments.filter((segment) => segment.isWordLike).length
      : segments.length;
  }

  /** A segmenter for the page's language, made once for each count type. */
  private segmenter(countType: NgxGovukCountType) {
    if (!('Segmenter' in Intl)) {
      return undefined;
    }
    let segmenter = this.segmenters.get(countType);
    if (!segmenter) {
      const lang =
        this.element?.closest('[lang]')?.getAttribute('lang') || undefined;
      segmenter = new Intl.Segmenter(lang, {
        granularity: countType === 'words' ? 'word' : 'grapheme',
      });
      // Keep it once the page's language is known.
      if (this.element) {
        this.segmenters.set(countType, segmenter);
      }
    }
    return segmenter;
  }
}

/** GOV.UK Frontend's count message, such as `You have 5 characters remaining`. */
function countMessage(remaining: number, unit: 'characters' | 'words'): string {
  const count = Math.abs(remaining);
  const units = count === 1 ? unit.slice(0, -1) : unit;
  return remaining < 0
    ? `You have ${count} ${units} too many`
    : `You have ${count} ${units} remaining`;
}
