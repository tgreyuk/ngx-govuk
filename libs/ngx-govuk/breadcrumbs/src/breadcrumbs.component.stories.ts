import { RouterModule, provideRouter } from '@angular/router';
import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { NgxGovukBreadcrumbItemDirective } from './breadcrumb-item.directive';
import { NgxGovukBreadcrumbsComponent } from './breadcrumbs.component';

const meta: Meta<NgxGovukBreadcrumbsComponent> = {
  component: NgxGovukBreadcrumbsComponent,
  title: 'UI/ngx-govuk-breadcrumbs',
  decorators: [
    moduleMetadata({
      imports: [RouterModule, NgxGovukBreadcrumbItemDirective],
    }),
    applicationConfig({
      providers: [
        provideRouter([
          { path: 'iframe.html', component: NgxGovukBreadcrumbsComponent },
        ]),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukBreadcrumbsComponent>;

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div class="govuk-frontend-supported">
        <ngx-govuk-breadcrumbs>
          <a ngxGovukBreadcrumbItem [routerLink]="['/']">Home</a>
          <a ngxGovukBreadcrumbItem [routerLink]="['/']">Passports, travel and living abroad</a>
          <a ngxGovukBreadcrumbItem [routerLink]="['/']">Travel abroad</a>
        </ngx-govuk-breadcrumbs>
      </div>
    `,
  }),
};
