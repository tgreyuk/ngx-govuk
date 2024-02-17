import { moduleMetadata, type Meta } from '@storybook/angular';

import { NgxGovukFormGroupComponent } from '../form-group/form-group.component';
import { NgxGovukTextInputDirective } from '../text-input/text-input.directive';
import { NgxGovukFieldsetComponent } from './fieldset.component';

const meta: Meta<NgxGovukFieldsetComponent> = {
  component: NgxGovukFieldsetComponent,
  title: 'Form Components/Fieldset',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukFormGroupComponent, NgxGovukTextInputDirective],
    }),
  ],
};
export default meta;
//type Story = StoryObj<NgxGovukFieldsetComponent>;

export const Fieldset = {
  args: {
    legend: 'What is your address?',
    hint: 'Fill in your details',
  },
  render: (args: NgxGovukFieldsetComponent) => ({
    props: args,
    template: `
<ngx-govuk-fieldset [legend]="legend" [hint]="hint">
  <ngx-govuk-form-group label="Address line 1">
    <input ngxGovukTextInput type="text" />
  </ngx-govuk-form-group>
</ngx-govuk-fieldset>`,
  }),
};
