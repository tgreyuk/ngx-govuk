import {
  Component,
  DestroyRef,
  Renderer2,
  afterEveryRender,
  afterNextRender,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  untracked,
  booleanAttribute,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  NgxGovukPluralText,
  NgxGovukUtilsService,
  formatPluralText,
} from 'ngx-govuk';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';

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
 * `ngxGovukTextarea` inside it, and it adds the label, hint and count. To
 * show an error, put a `p` with `ngxGovukErrorMessage` inside it too. Users can type past the limit, and the count tells them how many
 * characters or words to remove, as GOV.UK recommends, so a `maxlength`
 * attribute on the textarea is removed. Check the length when the form is
 * submitted too, counting the same way.
 *
 * The textarea keeps its own `id`, or one is generated. The hint, error
 * message and count get ids based on it.
 */
@Component({
  selector: 'ngx-govuk-character-count',
  templateUrl: './character-count.component.html',
  host: {
    class: 'govuk-form-group govuk-character-count',
    '[class.govuk-form-group--error]': '!!errorMessage()',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':host(:not([hidden])) { display: block; }',
})
export class NgxGovukCharacterCount {
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
  asPageHeading = input(false, { transform: booleanAttribute });

  /**
   * Hint text, to help users answer the question.
   */
  hint = input<string>();

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

  /**
   * Classes to add to the count message.
   */
  countMessageClasses = input<string>();

  /**
   * What screen readers hear about the limit, such as `You can enter up to
   * %{count} characters`. `%{count}` is replaced with `maxLength`.
   */
  textareaDescriptionText = input<string>();

  /**
   * The count when users are under the character limit. `%{count}` is
   * replaced with the number of characters left.
   */
  charactersUnderLimitText = input<NgxGovukPluralText>({
    one: 'You have %{count} character remaining',
    other: 'You have %{count} characters remaining',
  });

  /**
   * The count when users reach the character limit.
   */
  charactersAtLimitText = input('You have 0 characters remaining');

  /**
   * The count when users are over the character limit. `%{count}` is
   * replaced with the number of characters to remove.
   */
  charactersOverLimitText = input<NgxGovukPluralText>({
    one: 'You have %{count} character too many',
    other: 'You have %{count} characters too many',
  });

  /**
   * The count when users are under the word limit. `%{count}` is replaced
   * with the number of words left.
   */
  wordsUnderLimitText = input<NgxGovukPluralText>({
    one: 'You have %{count} word remaining',
    other: 'You have %{count} words remaining',
  });

  /**
   * The count when users reach the word limit.
   */
  wordsAtLimitText = input('You have 0 words remaining');

  /**
   * The count when users are over the word limit. `%{count}` is replaced
   * with the number of words to remove.
   */
  wordsOverLimitText = input<NgxGovukPluralText>({
    one: 'You have %{count} word too many',
    other: 'You have %{count} words too many',
  });

  protected fieldId = signal('');
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
  protected infoId = computed(() => `${this.fieldId()}-info`);

  protected labelClasses = computed(() => {
    const size = this.labelSize() ?? (this.asPageHeading() ? 'l' : undefined);
    return size ? `govuk-label govuk-label--${size}` : 'govuk-label';
  });

  private element?: HTMLTextAreaElement;
  private pluralRules = signal(new Intl.PluralRules('en'));
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
  protected description = computed(() =>
    (
      this.textareaDescriptionText() ??
      `You can enter up to %{count} ${
        this.countType() === 'words' ? 'words' : 'characters'
      }`
    ).replace('%{count}', String(this.maxLength())),
  );
  protected message = computed(() => this.countMessage(this.remaining()));
  protected screenReaderMessage = computed(() =>
    this.countMessage(
      this.maxLength() - this.countOf(this.screenReaderValue()),
    ),
  );

  /** Any aria-describedby the textarea already had, kept first as GOV.UK does. */
  private initialDescribedBy = signal('');

  private describedBy = computed(() =>
    [
      this.initialDescribedBy(),
      this.infoId(),
      this.hint() ? this.hintId() : '',
      this.errorMessage()?.id() ?? '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  /**
   * Sets up the textarea once it's rendered, which can be after the
   * character count, such as when it's inside `@if`.
   */
  private setUpTextarea = effect((onCleanup) => {
    const element = this.textarea()?.elementRef.nativeElement;
    if (!element) {
      return;
    }
    untracked(() => {
      this.initialDescribedBy.set(
        element.getAttribute('aria-describedby') ?? '',
      );
      if (!element.id) {
        this.renderer.setAttribute(
          element,
          'id',
          this.utilsService.randomId('field'),
        );
      }
      this.fieldId.set(element.id);
      this.removeMaxLength(element);
      const lang = element.closest('[lang]')?.getAttribute('lang') || 'en';
      this.pluralRules.set(new Intl.PluralRules(lang));

      this.element = element;
      const count = () => this.count(element.value);
      onCleanup(this.renderer.listen(element, 'input', count));
      // A form control can change the value without an input event.
      const subscription = this.control()?.valueChanges?.subscribe(count);
      onCleanup(() => subscription?.unsubscribe());
      this.value.set(element.value);
      this.screenReaderValue.set(element.value);
    });
  });

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

    // Bindings, signal forms and the browser can set the value without an
    // input event, so check it after each render.
    afterEveryRender(() => this.checkValue());
    // A page restored from the back/forward cache isn't rendered again.
    afterNextRender(() => {
      const unlisten = this.renderer.listen('window', 'pageshow', () =>
        this.checkValue(),
      );
      this.destroyRef.onDestroy(unlisten);
    });
  }

  /** Counts the value again if it changed without an input event. */
  private checkValue(): void {
    const element = this.element;
    if (!element) {
      return;
    }
    // Angular's maxlength validator can add the attribute back.
    this.removeMaxLength(element);
    if (element.value !== this.value()) {
      this.count(element.value);
    }
  }

  /** Lets users type past the limit, as GOV.UK Frontend does. */
  private removeMaxLength(element: HTMLTextAreaElement): void {
    if (element.hasAttribute('maxlength')) {
      this.renderer.removeAttribute(element, 'maxlength');
    }
  }

  /** The count message for the count type, such as `You have 5 characters remaining`. */
  private countMessage(remaining: number): string {
    const words = this.countType() === 'words';
    if (remaining === 0) {
      return words ? this.wordsAtLimitText() : this.charactersAtLimitText();
    }
    const texts =
      remaining < 0
        ? words
          ? this.wordsOverLimitText()
          : this.charactersOverLimitText()
        : words
          ? this.wordsUnderLimitText()
          : this.charactersUnderLimitText();
    return formatPluralText(texts, Math.abs(remaining), this.pluralRules());
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
