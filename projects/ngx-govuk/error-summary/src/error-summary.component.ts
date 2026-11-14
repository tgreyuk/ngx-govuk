import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';

/** One error in an error summary. */
export interface NgxGovukErrorSummaryItem {
  /** The error message, usually the same as the one next to the field. */
  text: string;
  /** A link to the field with the error, such as `#event-name`. */
  href?: string;
}

/**
 * Lists the errors on a page when validation fails, at the top of the
 * `main` content.
 *
 * Show it only when there are errors, such as after the form is submitted.
 * It takes focus when it appears, so screen reader users hear it. Each link
 * moves focus to its field and scrolls its label or legend into view.
 */
@Component({
  selector: 'ngx-govuk-error-summary',
  templateUrl: './error-summary.component.html',
})
export class NgxGovukErrorSummary {
  private document = inject(DOCUMENT);

  /**
   * The errors to list. Link each one to its field with `href`, such as
   * `#event-name`.
   */
  errorList = input.required<NgxGovukErrorSummaryItem[]>();

  /**
   * The heading of the summary.
   */
  titleText = input<string>('There is a problem');

  /**
   * Text shown above the list of errors.
   */
  description = input<string>();

  /**
   * Stops the summary taking focus when it appears. Only use it if something
   * else on the page needs focus.
   */
  disableAutoFocus = input<boolean>(false);

  private summary = viewChild.required<ElementRef<HTMLElement>>('summary');

  constructor() {
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
    const element = this.summary().nativeElement;
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

  protected focusField(event: MouseEvent, href: string) {
    const field = href.startsWith('#')
      ? this.document.getElementById(decodeURIComponent(href.slice(1)))
      : null;
    const labelOrLegend = field && this.labelOrLegend(field);
    if (!field || !labelOrLegend) return;

    // Follows GOV.UK Frontend: show the question as well as the field, and
    // don't follow the link, so the URL and router are left alone.
    event.preventDefault();
    labelOrLegend.scrollIntoView();
    field.focus({ preventScroll: true });
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
