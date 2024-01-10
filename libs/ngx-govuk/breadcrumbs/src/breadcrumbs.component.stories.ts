import type { Meta, StoryObj } from '@storybook/angular';
import { NgxGovukBreadcrumbsComponent } from './breadcrumbs.component';

const meta: Meta<NgxGovukBreadcrumbsComponent> = {
  component: NgxGovukBreadcrumbsComponent,
  title: 'govuk-breadcrumbs',
};
export default meta;
type Story = StoryObj<NgxGovukBreadcrumbsComponent>;

export const Primary: Story = {
  args: {},
};
