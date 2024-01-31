import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxGovukAccordionPanelComponent } from './ngx-govuk-accordion-panel.component';
import { NgxGovukAccordionComponent } from './ngx-govuk-accordion.component';

const meta: Meta<NgxGovukAccordionComponent> = {
  component: NgxGovukAccordionComponent,
  title: 'UI Components/ngx-govuk-accordion',
  decorators: [
    moduleMetadata({
      imports: [NgxGovukAccordionComponent, NgxGovukAccordionPanelComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<NgxGovukAccordionComponent>;

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
<div class="govuk-frontend-supported">
  <ngx-govuk-accordion>
    <ngx-govuk-accordion-panel heading="Writing well for the web"><p class="govuk-body">This is the content for Writing well for the web.</p></ngx-govuk-accordion-panel>
    <ngx-govuk-accordion-panel heading="Writing well for specialists"><p class="govuk-body">This is the content for Writing well for specialists.</p></ngx-govuk-accordion-panel>
    <ngx-govuk-accordion-panel heading="Know your audience"><p class="govuk-body">This is the content for Know your audience.</p></ngx-govuk-accordion-panel>
    <ngx-govuk-accordion-panel heading="How people read"><p class="govuk-body">This is the content for How people read.</p></ngx-govuk-accordion-panel>
  </ngx-govuk-accordion>
</div>
`,
  }),
};
