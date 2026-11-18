import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideEnvironmentInitializer,
} from '@angular/core';

/**
 * Sets up the page for ngx-govuk, as GOV.UK Frontend's page template and
 * `initAll()` do. Add it to the `providers` in your app's config.
 *
 * It adds the classes GOV.UK Frontend's page template puts on the page:
 * `govuk-template` on the `html` element and `govuk-template__body` on the
 * `body`, which set the page's background and text sizing.
 *
 * When the app starts in the browser, it also adds `govuk-frontend-supported`
 * to the `body`, as the page template does with an inline script. GOV.UK's
 * styles for the accordion, tabs and the conditionally revealed questions in
 * radios and checkboxes depend on it. It is not added during server-side
 * rendering, so users without JavaScript see those components' fallbacks.
 */
export function provideNgxGovuk(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const document = inject(DOCUMENT);
      document.documentElement?.classList.add('govuk-template');
      document.body?.classList.add('govuk-template__body');
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        document.body?.classList.add('govuk-frontend-supported');
      }
    }),
  ]);
}
