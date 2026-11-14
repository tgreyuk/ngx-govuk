import { computed, Directive, inject } from '@angular/core';
import { ExitThisPageRegistry } from './exit-this-page-registry';

/** Where GOV.UK Frontend sends users, if the page has no button. */
const DEFAULT_REDIRECT_URL = 'https://www.bbc.co.uk/weather';

/**
 * A skip link that lets keyboard users leave the page as soon as they
 * start tabbing, as the exit this page button does.
 *
 * Add it to an `a` element at the very top of the page, before the skip to
 * main content link, with the text "Exit this page". It goes where
 * `ngx-govuk-exit-this-page` on the page sends users, and hides the page
 * the same way. Without one, it goes to the BBC weather forecast.
 */
@Directive({
  selector: 'a[ngxGovukExitThisPageSkipLink]',
  host: {
    class: 'govuk-skip-link govuk-js-exit-this-page-skiplink',
    rel: 'nofollow noreferrer',
    '[attr.href]': 'href()',
    '(click)': 'exit($event)',
  },
})
export class NgxGovukExitThisPageSkipLink {
  private registry = inject(ExitThisPageRegistry);

  protected href = computed(
    () => this.registry.button()?.redirectUrl() ?? DEFAULT_REDIRECT_URL,
  );

  protected exit(event: MouseEvent) {
    this.registry.button()?.exit(event);
  }
}
