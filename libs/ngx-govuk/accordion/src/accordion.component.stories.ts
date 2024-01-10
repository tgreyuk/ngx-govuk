import type { Meta, StoryObj } from '@storybook/angular';
import { NgxGovukAccordionComponent } from './accordion.component';

const meta: Meta<NgxGovukAccordionComponent> = {
  component: NgxGovukAccordionComponent,
  title: 'ngx-govuk-accordion',
};
export default meta;
type Story = StoryObj<NgxGovukAccordionComponent>;

export const Primary: Story = {
  args: {},
};
