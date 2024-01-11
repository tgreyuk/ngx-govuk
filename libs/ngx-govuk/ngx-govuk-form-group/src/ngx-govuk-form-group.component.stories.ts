import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NgxGovukFormGroupComponent } from './ngx-govuk-form-group.component';

const meta: Meta<NgxGovukFormGroupComponent> = {
  component: NgxGovukFormGroupComponent,
  title: 'ngx-govuk-form-group',
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukFormGroupComponent>;

export const Preview: Story = {
  args: {
    label: 'What is the name of the event?',
    hint: 'The name you’ll use on promotional material',
    asPageHeading: true,
  },
  render: (args) => ({
    props: args,
    template: `
<ngx-govuk-form-group [label]="label" [hint]="hint" [asPageHeading]="asPageHeading">
  <input class="govuk-input" type="text" />
</ngx-govuk-form-group>`,
  }),
};
