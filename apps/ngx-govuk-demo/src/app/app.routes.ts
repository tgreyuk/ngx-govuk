import { Route } from '@angular/router';
import { AccordionComponent } from './routes/components/accordion/accordion.component';
import { ApiComponent } from './routes/components/accordion/api/api.component';
import { ExampleComponent } from './routes/components/accordion/example/example.component';
import { ComponentsComponent } from './routes/components/components.component';
import { TabsComponent } from './routes/components/tabs/tabs.component';
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
    path: 'components/accordion',
    component: AccordionComponent,
    children: [
      { path: 'api', component: ApiComponent },
      { path: 'example', component: ExampleComponent },
    ],
  },
  { path: 'components/tabs', component: TabsComponent },
];
