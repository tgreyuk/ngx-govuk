import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
  TitleStrategy,
} from '@angular/router';
import { provideNgxGovuk } from 'ngx-govuk';
import { PageMetaStrategy } from './page-meta.strategy';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(
      appRoutes,

      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),

      withComponentInputBinding(),

      // Start each new page at the top, go back to where you were with the
      // browser's back button, and scroll to the heading a link's #fragment
      // names.
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideNgxGovuk(),
    // Sets each page's title, description and canonical link.
    { provide: TitleStrategy, useClass: PageMetaStrategy },
  ],
};
