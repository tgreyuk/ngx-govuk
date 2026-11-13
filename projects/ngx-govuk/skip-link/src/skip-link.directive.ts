import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Lets keyboard users skip to the main content of a page.
 *
 * Add it to an `a` element at the very top of the page, and set its `href` to
 * the id of the page's main content, such as `#main-content`.
 *
 * It moves focus to that content itself, rather than following the link, so it
 * works with the router and a `base` element.
 */
@Directive({
  selector: 'a[ngxGovukSkipLink]',
  host: {
    class: 'govuk-skip-link',
    '(click)': 'skip($event)',
  },
})
export class NgxGovukSkipLink {
  private link = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  private document = inject(DOCUMENT);

  protected skip(event: MouseEvent) {
    const href = this.link.nativeElement.getAttribute('href') ?? '';
    const target = href.startsWith('#')
      ? this.document.getElementById(decodeURIComponent(href.slice(1)))
      : null;
    if (!target) return;

    event.preventDefault();

    // As GOV.UK Frontend does: make the content focusable for now, and mark it
    // so it shows no focus outline.
    const hadTabindex = target.hasAttribute('tabindex');
    if (!hadTabindex) target.setAttribute('tabindex', '-1');
    target.classList.add('govuk-skip-link-focused-element');
    target.addEventListener(
      'blur',
      () => {
        target.classList.remove('govuk-skip-link-focused-element');
        if (!hadTabindex) target.removeAttribute('tabindex');
      },
      { once: true },
    );
    target.focus();
  }
}
