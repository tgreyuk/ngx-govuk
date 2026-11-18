import { Type } from '@angular/core';
import { Route, UrlSegment } from '@angular/router';
import { ComponentPlaceholderComponent } from './routes/components/component-placeholder.component';
import { ComponentComponent } from './routes/components/component.component';
import { isDocumented } from './routes/components/components.data';
import { ComponentsLayoutComponent } from './routes/components/components-layout.component';
import { ComponentsComponent } from './routes/components/components.component';
import { DifferencesGuideComponent } from './routes/get-started/differences-guide.component';
import { FormsGuideComponent } from './routes/get-started/forms-guide.component';
import { GetStartedLayoutComponent } from './routes/get-started/get-started-layout.component';
import { GetStartedOverviewComponent } from './routes/get-started/get-started-overview.component';
import { GetStartedComponent } from './routes/get-started/get-started.component';
import { GUIDES } from './routes/get-started/get-started.data';
import { UsingComponentsComponent } from './routes/get-started/using-components.component';
import { HomeComponent } from './routes/home/home.component';
import { SupportComponent } from './routes/support/support.component';

/** A get started guide's route, with its title and summary from `GUIDES`. */
function guide(path: string, component: Type<unknown>): Route {
  const { name, description } = GUIDES.find(
    (guide) => guide.path === `/get-started/${path}`,
  )!;
  return { path, component, title: name, data: { description } };
}

/** Matches only components that have documentation. */
const documented = (_route: Route, segments: UrlSegment[]) =>
  isDocumented(segments[0]?.path);

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'get-started',
    component: GetStartedLayoutComponent,
    children: [
      {
        path: '',
        component: GetStartedOverviewComponent,
        title: 'Get started',
        data: {
          description:
            'Install ngx-govuk, set up GOV.UK Frontend and start using GOV.UK Design System components in your Angular app.',
        },
      },
      guide('installation', GetStartedComponent),
      guide('components', UsingComponentsComponent),
      guide('forms', FormsGuideComponent),
      guide('differences', DifferencesGuideComponent),
    ],
  },
  {
    path: 'components',
    component: ComponentsLayoutComponent,
    children: [
      {
        path: '',
        component: ComponentsComponent,
        title: 'Components',
        data: {
          description:
            'Every GOV.UK Design System component in ngx-govuk, with live examples, their code and an API reference.',
        },
      },
      // Documented components get two tabs: an overview with examples, and the API.
      {
        path: ':componentId',
        canMatch: [documented],
        component: ComponentComponent,
        data: { tab: 'overview' },
      },
      {
        path: ':componentId/api',
        canMatch: [documented],
        component: ComponentComponent,
        data: { tab: 'api' },
      },
      // Everything else: a placeholder for components not documented yet.
      { path: ':componentId', component: ComponentPlaceholderComponent },
    ],
  },
  {
    path: 'support',
    component: SupportComponent,
    title: 'Help and support',
    data: {
      description:
        'Get help with ngx-govuk, report a bug or request a component, and see which versions of Angular and GOV.UK Frontend are supported.',
    },
  },
];
