import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxGovukBackLinkDirective } from './back-link.directive';

const meta: Meta<NgxGovukBackLinkDirective> = {
  component: NgxGovukBackLinkDirective,
  title: 'Back Link',
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukBackLinkDirective>;

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ngxGovukBackLink>Back</a>
    `,
  }),
};