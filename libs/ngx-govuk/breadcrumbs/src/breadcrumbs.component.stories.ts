import { provideRouter } from '@angular/router';
import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { NgxGovukBreadcrumbsComponent } from './breadcrumbs.component';

const meta: Meta<NgxGovukBreadcrumbsComponent> = {
  component: NgxGovukBreadcrumbsComponent,
  title: 'govuk-breadcrumbs',
  decorators: [
    moduleMetadata({
      imports: [],
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
  args: {
    items: [
      {
        text: 'Home',
        routerLink: '/',
      },
      {
        text: 'Passports, travel and living abroad',
        routerLink: '/',
      },
      {
        text: 'Travel abroad',
        routerLink: '/',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
<div class="govuk-frontend-supported">
  <ngx-govuk-breadcrumbs [items]="items"></ngx-govuk-breadcrumbs>
</div>
`,
  }),
};
