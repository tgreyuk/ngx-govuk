import { Route } from '@angular/router';
import { ComponentApiComponent } from './routes/components/component-api/component-api.component';
import { ComponentCodeComponent } from './routes/components/component-code/component-code.component';
import { ComponentPreviewComponent } from './routes/components/component-preview/component-preview.component';
import { ComponentComponent } from './routes/components/component.component';
import { ComponentsComponent } from './routes/components/components.component';
import { GetStartedComponent } from './routes/get-started/get-started.component';
import { HomeComponent } from './routes/home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'get-started', component: GetStartedComponent },
  {
    path: 'components',
    component: ComponentsComponent,
  },
  {
    path: 'components/:componentId',
    component: ComponentComponent,
    children: [
      { path: 'preview', component: ComponentPreviewComponent },
      { path: 'code', component: ComponentCodeComponent },
      { path: 'api', component: ComponentApiComponent },
      { path: '', redirectTo: 'preview', pathMatch: 'full' },
    ],
  },
];
