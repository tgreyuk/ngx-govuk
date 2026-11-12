import { moduleMetadata, type Meta } from '@storybook/angular';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';
import { NgxGovukCharacterCount } from './character-count.component';

const meta: Meta<NgxGovukCharacterCount> = {
  component: NgxGovukCharacterCount,
  title: 'Components/Character Count',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukFormGroup, NgxGovukTextarea],
    }),
  ],
};
export default meta;

// Currently unable to type Preview: Story - See https://github.com/storybookjs/storybook/issues/25784
export const CharacterCount = {
  args: {
    limit: 10,
  },
  render: (args: NgxGovukCharacterCount) => ({
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
