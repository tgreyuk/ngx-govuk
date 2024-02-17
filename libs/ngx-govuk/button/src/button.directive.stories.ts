import { moduleMetadata, type Meta } from '@storybook/angular';
import { NgxGovukButtonGroupDirective } from './button-group.directive';
import { NgxGovukButtonDirective } from './button.directive';

const meta: Meta<NgxGovukButtonDirective> = {
  component: NgxGovukButtonDirective,
  title: 'UI Components/Button',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukButtonGroupDirective],
    }),
  ],
};
export default meta;
//type Story = StoryObj<NgxGovukButtonDirective>;

export const Button = {
  argTypes: {
    type: {
      options: ['default', 'secondary', 'warning'],
      control: { type: 'select' },
    },
  },
  render: (args: NgxGovukButtonDirective) => ({
    props: args,
    template: `
      <button ngxGovukButton [type]="type">Action</button>
    `,
  }),
};

export const ButtonGroup = {
  render: () => ({
    template: `
      <div ngxGovukButtonGroup>
        <button ngxGovukButton>Coninue</button>
        <a href="#" ngxGovukButton type="secondary">Cancel</a>
      </div>
    `,
  }),
};
