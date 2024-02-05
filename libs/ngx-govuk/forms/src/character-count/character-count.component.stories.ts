import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NgxGovukFormGroupComponent } from '../form-group/form-group.component';
import { NgxGovukTextareaDirective } from '../textarea/textarea.directive';
import { NgxGovUkCharacterCountComponent } from './character-count.component';

const meta: Meta<NgxGovUkCharacterCountComponent> = {
  component: NgxGovUkCharacterCountComponent,
  title: 'Character Count',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukFormGroupComponent, NgxGovukTextareaDirective],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovUkCharacterCountComponent>;

export const Preview: Story = {
  args: {
    limit: 10,
  },
  render: (args) => ({
    props: args,
    template: `
<ngx-govuk-character-count [limit]="limit">
  <ngx-govuk-form-group label="Can you provide more detail?" hint="Do not include personal or financial information like your National Insurance number or credit card details." >
    <textarea ngxGovukTextarea></textarea>
  </ngx-govuk-form-group>
</ngx-govuk-character-count>`,
  }),
};
