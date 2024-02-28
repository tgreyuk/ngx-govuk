import { moduleMetadata, type Meta } from '@storybook/angular';
import { NgxGovukButtonGroup } from './button-group.component';
import { NgxGovukButton } from './button.directive';

const meta: Meta<NgxGovukButton> = {
  component: NgxGovukButton,
  title: 'UI Components/Button',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukButtonGroup],
    }),
  ],
};
export default meta;

export const Button = {
  argTypes: {
    buttonType: {
      options: ['Default', 'secondary', 'warning', 'start'],
      control: { type: 'select' },
    },
    inversed: { type: 'boolean' },
  },
  render: (args: NgxGovukButton) => ({
    props: args,
    template: `
      <button ngxGovukButton [buttonType]="buttonType" [inversed]="inversed">Action</button>
    `,
  }),
};

export const ButtonGroup = {
  render: () => ({
    template: `
      <ngx-govuk-button-group>
        <button ngxGovukButton>Continue</button>
        <a href="#" ngxGovukButton buttonType="secondary">Cancel</a>
      </ngx-govuk-button-group>
    `,
  }),
};
