import { Route, UrlSegment } from '@angular/router';
import { ComponentApiComponent } from './routes/components/component-api/component-api.component';
import { ComponentCodeComponent } from './routes/components/component-code/component-code.component';
import { ComponentPreviewComponent } from './routes/components/component-preview/component-preview.component';
import { ComponentPlaceholderComponent } from './routes/components/component-placeholder.component';
import { ComponentComponent } from './routes/components/component.component';
import { isDocumented } from './routes/components/components.data';
import { ComponentsLayoutComponent } from './routes/components/components-layout.component';
import { ComponentsComponent } from './routes/components/components.component';
import { FormsGuideComponent } from './routes/get-started/forms-guide.component';
import { GetStartedLayoutComponent } from './routes/get-started/get-started-layout.component';
import { GetStartedOverviewComponent } from './routes/get-started/get-started-overview.component';
import { GetStartedComponent } from './routes/get-started/get-started.component';
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
      {
        path: ':componentId',
        // Documented components get the page with demo, code and API tabs.
        canMatch: [
          (_route: Route, segments: UrlSegment[]) =>
            isDocumented(segments[0]?.path),
        ],
        component: ComponentComponent,
        children: [
          { path: 'preview', component: ComponentPreviewComponent },
          { path: 'code', component: ComponentCodeComponent },
          { path: 'api', component: ComponentApiComponent },
          { path: '', redirectTo: 'preview', pathMatch: 'full' },
        ],
      },
      // Everything else: a placeholder for components not documented yet.
      { path: ':componentId', component: ComponentPlaceholderComponent },
    ],
  },
  { path: 'support', component: SupportComponent },
];
