import { moduleMetadata, type Meta } from '@storybook/angular';

import { NgxGovukFormGroupComponent } from '../form-group/form-group.component';
import { NgxGovukTextareaDirective } from '../textarea/textarea.directive';
import { NgxGovUkCharacterCountComponent } from './character-count.component';

const meta: Meta<NgxGovUkCharacterCountComponent> = {
  component: NgxGovUkCharacterCountComponent,
  title: 'Form Components/Character Count',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukFormGroupComponent, NgxGovukTextareaDirective],
    }),
  ],
};
export default meta;
//type Story = StoryObj<NgxGovUkCharacterCountComponent>
// Currently unable to type Preview: Story - See https://github.com/storybookjs/storybook/issues/25784
export const CharacterCount = {
  args: {
    limit: 10,
  },
  render: (args: NgxGovUkCharacterCountComponent) => ({
    props: {
      limit: args.limit,
    },
    template: `
<ngx-govuk-character-count [limit]="limit">
  <ngx-govuk-form-group [asPageHeading]="true" label="Can you provide more detail?" hint="Do not include personal or financial information like your National Insurance number or credit card details." >
    <textarea ngxGovukTextarea></textarea>
  </ngx-govuk-form-group>
</ngx-govuk-character-count>`,
  }),
};
