import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxGovukTextarea } from './textarea.directive';

const meta: Meta<NgxGovukTextarea> = {
  component: NgxGovukTextarea,
  title: 'Components/Textarea',
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukTextarea>;

export const Textarea: Story = {
  render: (args) => ({
    props: args,
    template: `
      <textarea ngxGovukTextarea></textarea>
    `,
  }),
};
