import { RouterModule, provideRouter } from '@angular/router';
import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { NgxGovukBreadcrumbsItem } from './breadcrumbs-item.directive';
import { NgxGovukBreadcrumbs } from './breadcrumbs.component';

const meta: Meta<NgxGovukBreadcrumbs> = {
  component: NgxGovukBreadcrumbs,
  title: 'Components/Breadcrumbs',
  decorators: [
    moduleMetadata({
      imports: [RouterModule, NgxGovukBreadcrumbsItem],
    }),
    applicationConfig({
      providers: [
        provideRouter([
          { path: 'iframe.html', component: NgxGovukBreadcrumbs },
        ]),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukBreadcrumbs>;

export const Breadcrumbs: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ngx-govuk-breadcrumbs>
          <a ngxGovukBreadcrumbsItem [routerLink]="['/']">Home</a>
          <a ngxGovukBreadcrumbsItem [routerLink]="['/']">Passports, travel and living abroad</a>
          <a ngxGovukBreadcrumbsItem [routerLink]="['/']">Travel abroad</a>
      </ngx-govuk-breadcrumbs>
    `,
  }),
};
