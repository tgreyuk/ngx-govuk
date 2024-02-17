import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxGovukTextareaDirective } from './textarea.directive';

const meta: Meta<NgxGovukTextareaDirective> = {
  component: NgxGovukTextareaDirective,
  title: 'Form Components/Textarea',
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukTextareaDirective>;

export const Textarea: Story = {
  render: (args) => ({
    props: args,
    template: `
      <textarea ngxGovukTextarea></textarea>
    `,
  }),
};
