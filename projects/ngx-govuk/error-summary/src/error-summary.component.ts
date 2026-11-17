import { DOCUMENT, Location } from '@angular/common';
import {
  afterNextRender,
  booleanAttribute,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgxGovukErrorSummaryTargets } from 'ngx-govuk';

/** One error in an error summary. */
export interface NgxGovukErrorSummaryItem {
  /** The error message, usually the same as the one next to the field. */
  text: string;
  /**
   * The form control of the field with the error. The summary links the
   * error to the ngx-govuk field bound to it with `[formControl]` or
   * `formControlName`, wherever it is on the page. For radios, it links to
   * the first radio, and for a date input, to the first part in
   * `errorParts`. The field still needs an `id` or `name`.
   */
  control?: AbstractControl;
  /**
   * The `id` of the field with the error, such as `event-name`, for a field
   * without a form control. This replaces GOV.UK Frontend's `href`.
   */
  fieldId?: string;
}

/**
 * Lists the errors on a page when validation fails, at the top of the
 * `main` content.
 *
 * Show it only when there are errors, such as after the form is submitted.
 * It takes focus when it appears, so screen reader users hear it. Link each
 * error to its field with the field's form control, or with its `id`:
 * selecting the error moves focus to the field and scrolls its label or
 * legend into view.
 *
 * For a description with links or other markup, put a `p` inside the summary
 * instead of setting `descriptionText`. Links in it to a field, such as
 * `href="#event-name"`, work the same way.
 */
@Component({
  selector: 'ngx-govuk-error-summary',
  templateUrl: './error-summary.component.html',
  host: {
    class: 'govuk-error-summary',
    // As GOV.UK Frontend does, handle links in a projected description too.
    '(click)': 'focusDescriptionLink($event)',
  },
  // Custom elements are inline by default; GOV.UK's styles expect a block.
  styles: ':where(:host:not([hidden])) { display: block; }',
})
export class NgxGovukErrorSummary {
  private document = inject(DOCUMENT);
  private location = inject(Location);
  private targets = inject(NgxGovukErrorSummaryTargets);

  /** The current page's URL, without its fragment, for the links. */
  private pageUrl = signal(this.currentPageUrl());

  /**
   * The errors to list. Link each one to its field with `control`, the
   * field's form control, or `fieldId`, such as `event-name`.
   */
  errorList = input<NgxGovukErrorSummaryItem[]>([]);

  /**
   * The heading of the summary.
   */
  titleText = input<string>('There is a problem');

  /**
   * Text shown above the list of errors.
   */
  descriptionText = input<string>();

  /**
   * Stops the summary taking focus when it appears. Only use it if something
   * else on the page needs focus.
   */
  disableAutoFocus = input(false, { transform: booleanAttribute });

  private summary = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const stopListening = this.location.onUrlChange(() =>
      this.pageUrl.set(this.currentPageUrl()),
    );
    inject(DestroyRef).onDestroy(stopListening);

    afterNextRender(() => {
      if (!this.disableAutoFocus()) {
        this.focus();
      }
    });
  }

  /**
   * Moves focus to the summary. Call it when the errors change while the
   * summary is already showing, such as when a form is submitted again.
   */
  focus() {
    // As GOV.UK Frontend does: make the summary focusable for now.
    const element = this.summary.nativeElement;
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '-1');
      element.addEventListener(
        'blur',
        () => element.removeAttribute('tabindex'),
        { once: true },
      );
    }
    element.focus();
  }

  /**
   * A link to the field on this page. Built from the page's URL, not a bare
   * `#id`, so it stays on this page with a `base` element, before the app
   * starts and without JavaScript.
   */
  protected fieldHref(fieldId: string) {
    return `${this.pageUrl()}#${encodeURIComponent(fieldId)}`;
  }

  /** The id of the item's field, if it's on the page. */
  protected linkId(item: NgxGovukErrorSummaryItem) {
    return (
      item.fieldId ?? (item.control ? this.targets.linkId(item.control) : null)
    );
  }

  protected focusField(event: MouseEvent, fieldId: string) {
    const field = this.document.getElementById(fieldId);
    if (!field) return;

    // As GOV.UK Frontend does: show the question as well as the field, and
    // don't follow the link, so the URL and history are left alone.
    event.preventDefault();
    (this.labelOrLegend(field) ?? field).scrollIntoView();
    field.focus({ preventScroll: true });
  }

  protected focusDescriptionLink(event: MouseEvent) {
    if (event.defaultPrevented) return;
    const href =
      (event.target as Element | null)?.closest('a')?.getAttribute('href') ??
      '';
    if (href.startsWith('#')) {
      this.focusField(event, decodeURIComponent(href.slice(1)));
    }
  }

  private currentPageUrl() {
    return this.location.prepareExternalUrl(this.location.path());
  }

  /**
   * The field's legend, if it's in a fieldset and the legend will be on
   * screen with it, or else its label. Ported from GOV.UK Frontend.
   */
  private labelOrLegend(field: HTMLElement): HTMLElement | null {
    const legend = field.closest('fieldset')?.querySelector('legend');
    if (legend) {
      if (
        field instanceof HTMLInputElement &&
        (field.type === 'checkbox' || field.type === 'radio')
      ) {
        return legend;
      }
      const legendTop = legend.getBoundingClientRect().top;
      const fieldRect = field.getBoundingClientRect();
      const viewportHeight = this.document.defaultView?.innerHeight;
      if (fieldRect.height && viewportHeight) {
        const fieldBottom = fieldRect.top + fieldRect.height;
        if (fieldBottom - legendTop < viewportHeight / 2) {
          return legend;
        }
      }
    }
    const labels = Array.from(
      this.document.querySelectorAll<HTMLLabelElement>('label[for]'),
    );
    return (
      labels.find((label) => label.htmlFor === field.id) ??
      field.closest('label')
    );
  }
}
