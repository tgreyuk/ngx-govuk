import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Routes,
  provideRouter,
} from '@angular/router';
import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import {
  NgxGovukTabComponent,
  NgxGovukTabLinkDirective,
  NgxGovukTabsComponent,
  NgxGovukTabsNavComponent,
} from './';

@Component({
  template: 'Route Content A',
})
export class ContentAComponent {}

@Component({
  template: 'Route Content B',
})
export class ContentBComponent {}

const routes: Routes = [
  { path: 'iframe.html', component: ContentAComponent },
  { path: 'b', component: ContentBComponent },
];

const meta: Meta<NgxGovukTabsComponent> = {
  component: NgxGovukTabsComponent,
  title: 'Components/Tabs',
  parameters: {
    controls: {
      include: [],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        NgxGovukTabComponent,
        NgxGovukTabsNavComponent,
        NgxGovukTabLinkDirective,
        RouterLinkActive,
        RouterOutlet,
        RouterLink,
      ],
    }),
    applicationConfig({
      providers: [provideRouter(routes)],
    }),
  ],
};
export default meta;

export const TabsGroup: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
  <ngx-govuk-tabs-group>
    <ngx-govuk-tab label="Label A" [selected]="true">
      <p class="govuk-body">Inline Content A</p>
    </ngx-govuk-tab>
    <ngx-govuk-tab label="Label B">
    <p class="govuk-body">Inline Content B</p>
    </ngx-govuk-tab>
  </ngx-govuk-tabs-group>
`,
  }),
};

export const TabsNav: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
<ngx-govuk-tabs-nav>
  <a ngxGovukTabLink routerLink="iframe.html" routerLinkActive>Label A</a>
  <a ngxGovukTabLink routerLink="b" routerLinkActive>Label B</a>
  <router-outlet></router-outlet>
</ngx-govuk-tabs-nav>
`,
  }),
};
