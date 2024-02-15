import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxGovukTextInputDirective } from './text-input.directive';

const meta: Meta<NgxGovukTextInputDirective> = {
  component: NgxGovukTextInputDirective,
  title: 'Text Input',
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    width: {
      options: ['full', '20', '10', '5', '4', '3', '2'],
      control: { type: 'select' },
    },
  },
};
export default meta;
type Story = StoryObj<NgxGovukTextInputDirective>;

export const Preview: Story = {
  args: {
    width: 'full',
  },
  render: (args) => ({
    props: args,
    template: `
      <input ngxGovukTextInput type="text" [width]="width" />
    `,
  }),
};