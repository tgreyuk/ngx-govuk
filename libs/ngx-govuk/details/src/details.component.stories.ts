import { moduleMetadata, type Meta } from '@storybook/angular';
import { NgxGovukDetailsComponent } from './details.component';

const meta: Meta<NgxGovukDetailsComponent> = {
  component: NgxGovukDetailsComponent,
  title: 'UI Components/Details',
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};
export default meta;

export const Details = {
  args: {
    summaryText: 'Help with nationality',
    text: 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.',
  },
  render: (args: NgxGovukDetailsComponent) => ({
    props: args,
    template: `
      <ngx-govuk-details [summaryText]="summaryText" [text]="text">
      </ngx-govuk-details>`,
  }),
};