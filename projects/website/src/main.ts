import { isDevMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { inject as injectAnalytics } from '@vercel/analytics';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Vercel Analytics: tracks page views, including client-side route changes.
// In dev mode it logs events to the console instead of sending them.
injectAnalytics({ mode: isDevMode() ? 'development' : 'production' });

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideZoneChangeDetection(), ...appConfig.providers],
}).catch((err) => console.error(err));
