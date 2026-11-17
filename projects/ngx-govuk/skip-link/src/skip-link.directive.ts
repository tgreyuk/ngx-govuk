import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Helps keyboard-only users skip to the main content on a page.
 *
 * Add it to an `a` element straight after the opening `body` tag, or straight
 * after the cookie banner if there is one. Set its `href` to the id of the
 * page's main content, such as `#main-content`.
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
    // Leave clicks that open the link elsewhere, such as in a new tab, to the
    // browser.
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const href = this.link.nativeElement.getAttribute('href') ?? '';
    const target = href.startsWith('#')
      ? this.document.getElementById(decodeURIComponent(href.slice(1)))
      : null;
    if (!target) return;

    event.preventDefault();

    // As GOV.UK Frontend does: make the content focusable for now, and mark it
    // so it shows no focus outline. Tidy up when it loses focus, listening for
    // that only once it has focus, so nothing is left behind if it can't take
    // focus.
    const hadTabindex = target.hasAttribute('tabindex');
    if (!hadTabindex) target.setAttribute('tabindex', '-1');
    target.classList.add('govuk-skip-link-focused-element');

    const tidyUp = () => {
      target.classList.remove('govuk-skip-link-focused-element');
      if (!hadTabindex) target.removeAttribute('tabindex');
    };
    const onFocus = () =>
      target.addEventListener('blur', tidyUp, { once: true });
    target.addEventListener('focus', onFocus, { once: true });
    target.focus();
    if (this.document.activeElement !== target) {
      target.removeEventListener('focus', onFocus);
      tidyUp();
    }
  }
}
