import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxGovukBackLink } from './back-link.directive';

const meta: Meta<NgxGovukBackLink> = {
  component: NgxGovukBackLink,
  title: 'Components/Back Link',
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukBackLink>;

export const BackLink: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ngxGovukBackLink>Back</a>
    `,
  }),
};
