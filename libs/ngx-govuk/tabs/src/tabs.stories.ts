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
  NgxGovukTabsComponent,
  NgxGovukTabsNavComponent,
  NgxGovukTabsPanelComponent,
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
  parameters: {
    controls: {
      include: [],
    },
  },
  title: 'Components/Tabs',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        NgxGovukTabsPanelComponent,
        NgxGovukTabsNavComponent,
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
  <a routerLink="iframe.html" routerLinkActive #ngxGovukTabsLink="routerLinkActive">Label A</a>
  <a routerLink="b" routerLinkActive #ngxGovukTabsLink="routerLinkActive">Label B</a>
  <router-outlet></router-outlet>
</ngx-govuk-tabs-nav>
`,
  }),
};
