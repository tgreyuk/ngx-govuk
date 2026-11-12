import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,

      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),

      withComponentInputBinding()
    ),
  ],
};
