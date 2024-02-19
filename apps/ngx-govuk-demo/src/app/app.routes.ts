import { Route } from '@angular/router';
import { ComponentsComponent } from './routes/components/components.component';
import { GetStartedComponent } from './routes/get-started/get-started.component';
import { HomeComponent } from './routes/home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'components', component: ComponentsComponent },
];
