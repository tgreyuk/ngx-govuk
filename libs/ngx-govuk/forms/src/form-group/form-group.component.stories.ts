import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NgxGovukTextInputDirective } from '../text-input/text-input.directive';
import { NgxGovukTextareaDirective } from '../textarea/textarea.directive';
import { NgxGovukFormGroupComponent } from './form-group.component';

const meta: Meta<NgxGovukFormGroupComponent> = {
  component: NgxGovukFormGroupComponent,
  title: 'Form Components/Form Group',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukTextInputDirective, NgxGovukTextareaDirective],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukFormGroupComponent>;

export const FormGroup: Story = {
  args: {
    label: 'What is the name of the event?',
    hint: 'The name you’ll use on promotional material',
    asPageHeading: true,
  },
  render: (args) => ({
    props: args,
    template: `
<ngx-govuk-form-group [label]="label" [hint]="hint" [asPageHeading]="asPageHeading">
  <input ngxGovukTextInput type="text" />
</ngx-govuk-form-group>`,
  }),
};
