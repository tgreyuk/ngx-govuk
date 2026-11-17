import { DOCUMENT } from '@angular/common';
import {
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  Renderer2,
  signal,
  untracked,
  booleanAttribute,
} from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';

/**
 * Helps users enter a password, with a button to show it.
 *
 * Use it in place of `ngx-govuk-form-group`: put an `input` with
 * `ngxGovukTextInput` inside it, and it adds the label, hint and "Show"
 * button. To show an error, put a `p` with `ngxGovukErrorMessage` inside it
 * too. It makes the input a password field, turns off spell
 * checking and capitalisation, and sets `autocomplete` to `current-password`
 * unless the input has its own. Use `new-password` when users are creating
 * one.
 *
 * The password is hidden again when the form is submitted, as GOV.UK
 * Frontend does.
 */
@Component({
  selector: 'ngx-govuk-password-input',
  templateUrl: './password-input.component.html',
  host: {
    class: 'govuk-form-group govuk-password-input',
    '[class.govuk-form-group--error]': '!!errorMessage()',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':host(:not([hidden])) { display: block; }',
})
export class NgxGovukPasswordInput {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private utilsService = inject(NgxGovukUtilsService);
  private textInput = contentChild(NgxGovukTextInput);

  /**
   * The input's label.
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

  protected labelClasses = computed(() => {
    const size = this.labelSize() ?? (this.asPageHeading() ? 'l' : undefined);
    return size ? `govuk-label govuk-label--${size}` : 'govuk-label';
  });

  protected shown = signal(false);
  /** Empty until users first press the button, so nothing is announced on load. */
  protected announcement = signal('');

  /** Any aria-describedby the input already had, kept first as GOV.UK does. */
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
   * Sets up the input once it's rendered, which can be after the password
   * input, such as when it's inside `@if`.
   */
  private setUpInput = effect((onCleanup) => {
    const element = this.textInput()?.elementRef.nativeElement;
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

      // The attributes GOV.UK Frontend's macro gives a password input.
      this.renderer.addClass(element, 'govuk-password-input__input');
      this.renderer.setAttribute(element, 'spellcheck', 'false');
      this.renderer.setAttribute(element, 'autocapitalize', 'none');
      if (!element.hasAttribute('autocomplete')) {
        this.renderer.setAttribute(element, 'autocomplete', 'current-password');
      }

      // Hide the password before the form is sent, and when users come back
      // to the page from the browser's cache. The type is set straight away,
      // as a form that posts can leave the page before Angular updates it.
      const hide = () => {
        this.shown.set(false);
        this.renderer.setAttribute(element, 'type', 'password');
      };
      if (element.form) {
        onCleanup(this.renderer.listen(element.form, 'submit', hide));
      }
      const view = this.document.defaultView;
      if (view) {
        onCleanup(
          this.renderer.listen(
            view,
            'pageshow',
            (event: PageTransitionEvent) => {
              if (event.persisted) hide();
            },
          ),
        );
      }
    });
  });

  constructor() {
    effect(() => {
      const textInput = this.textInput();
      if (!textInput || !this.fieldId()) {
        return;
      }
      const element = textInput.elementRef.nativeElement;
      textInput.hasError.set(!!this.errorMessage());
      this.renderer.setAttribute(
        element,
        'type',
        this.shown() ? 'text' : 'password',
      );
      const describedBy = this.describedBy();
      if (describedBy) {
        this.renderer.setAttribute(element, 'aria-describedby', describedBy);
      } else {
        this.renderer.removeAttribute(element, 'aria-describedby');
      }
    });
  }

  protected toggle() {
    const shown = !this.shown();
    this.shown.set(shown);
    this.announcement.set(
      shown ? 'Your password is visible' : 'Your password is hidden',
    );
  }
}
