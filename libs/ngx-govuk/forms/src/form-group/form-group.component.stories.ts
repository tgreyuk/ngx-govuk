import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NgxGovukTextInputDirective } from '../text-input/text-input.directive';
import { NgxGovukTextareaDirective } from '../textarea/textarea.directive';
import { NgxGovukFormGroupComponent } from './form-group.component';

const meta: Meta<NgxGovukFormGroupComponent> = {
  component: NgxGovukFormGroupComponent,
  title: 'Form/ngx-govuk-form-group',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukTextInputDirective, NgxGovukTextareaDirective],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukFormGroupComponent>;

export const PreviewTextInput: Story = {
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

export const PreviewTextarea: Story = {
  args: {
    label: 'Can you provide more detail?',
    hint: 'Do not include personal or financial information, like your National Insurance number or credit card details.',
    asPageHeading: true,
  },
  render: (args) => ({
    props: args,
    template: `
<ngx-govuk-form-group [label]="label" [hint]="hint" [asPageHeading]="asPageHeading">
  <textarea ngxGovukTextarea></textarea>
</ngx-govuk-form-group>`,
  }),
};
