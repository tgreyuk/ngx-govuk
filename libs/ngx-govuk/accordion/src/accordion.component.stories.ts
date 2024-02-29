import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxGovukAccordionPanel } from './accordion-panel.component';
import { NgxGovukAccordion } from './accordion.component';

const meta: Meta<NgxGovukAccordion> = {
  component: NgxGovukAccordion,
  title: 'Components/Accordion',
  parameters: {
    controls: {
      include: [],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
    }),
  ],
};
export default meta;

export const Accordion: StoryObj<NgxGovukAccordion> = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
 <ngx-govuk-accordion #accordion>
    <ngx-govuk-accordion-panel #panel1 heading="Writing well for the web"><p class="govuk-body">This is the content for Writing well for the web.</p></ngx-govuk-accordion-panel>
    <ngx-govuk-accordion-panel heading="Writing well for specialists"><p class="govuk-body">This is the content for Writing well for specialists.</p></ngx-govuk-accordion-panel>
    <ngx-govuk-accordion-panel heading="Know your audience"><p class="govuk-body">This is the content for Know your audience.</p></ngx-govuk-accordion-panel>
    <ngx-govuk-accordion-panel heading="How people read"><p class="govuk-body">This is the content for How people read.</p></ngx-govuk-accordion-panel>
  </ngx-govuk-accordion>

<h2>Debug</h2>
<h3>ngx-govuk-accordion</h3>
<p>
isExpanded: {{accordion.isExpanded()}}
</p>
<p>
<button (click)="accordion.toggle()">Toggle</button>
</p>

<h3>ngx-govuk-accordion-panel</h3>
<p>
isExpanded: {{panel1.isExpanded()}}
</p>
<p>
<button (click)="panel1.toggle()">Toggle</button>
</p>
`,
  }),
};
