import { Route, UrlSegment } from '@angular/router';
import { ComponentPlaceholderComponent } from './routes/components/component-placeholder.component';
import { ComponentComponent } from './routes/components/component.component';
import { isDocumented } from './routes/components/components.data';
import { ComponentsLayoutComponent } from './routes/components/components-layout.component';
import { ComponentsComponent } from './routes/components/components.component';
import { FormsGuideComponent } from './routes/get-started/forms-guide.component';
import { GetStartedLayoutComponent } from './routes/get-started/get-started-layout.component';
import { GetStartedOverviewComponent } from './routes/get-started/get-started-overview.component';
import { GetStartedComponent } from './routes/get-started/get-started.component';
import { UsingComponentsComponent } from './routes/get-started/using-components.component';
import { HomeComponent } from './routes/home/home.component';
import { SupportComponent } from './routes/support/support.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'get-started',
    component: GetStartedLayoutComponent,
    children: [
      { path: '', component: GetStartedOverviewComponent },
      { path: 'installation', component: GetStartedComponent },
      { path: 'components', component: UsingComponentsComponent },
      { path: 'forms', component: FormsGuideComponent },
    ],
  },
  {
    path: 'components',
    component: ComponentsLayoutComponent,
    children: [
      { path: '', component: ComponentsComponent },
      // The form group is documented in the forms guide.
      { path: 'form-group', redirectTo: '/get-started/forms' },
      // The demo, code and API used to be separate tabs with their own URLs.
      { path: ':componentId/:tab', redirectTo: '/components/:componentId' },
      {
        path: ':componentId',
        // Documented components get the page with the demo, code and API.
        canMatch: [
          (_route: Route, segments: UrlSegment[]) =>
            isDocumented(segments[0]?.path),
        ],
        component: ComponentComponent,
      },
      // Everything else: a placeholder for components not documented yet.
      { path: ':componentId', component: ComponentPlaceholderComponent },
    ],
  },
  { path: 'support', component: SupportComponent },
];
