import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxGovukAccordion, NgxGovukAccordionPanel } from 'ngx-govuk/accordion';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [CommonModule, NgxGovukAccordion, NgxGovukAccordionPanel],
  template: `
    <ngx-govuk-accordion #accordion>
      <ngx-govuk-accordion-panel heading="Writing well for the web">
        <p class="govuk-body">
          This is the content for Writing well for the web.
        </p>
      </ngx-govuk-accordion-panel>
      <ngx-govuk-accordion-panel heading="Writing well for specialists">
        <p class="govuk-body">
          This is the content for Writing well for specialists.
        </p>
      </ngx-govuk-accordion-panel>
      <ngx-govuk-accordion-panel heading="Know your audience">
        <p class="govuk-body">This is the content for Know your audience.</p>
      </ngx-govuk-accordion-panel>
      <ngx-govuk-accordion-panel heading="How people read">
        <p class="govuk-body">This is the content for How people read.</p>
      </ngx-govuk-accordion-panel>
    </ngx-govuk-accordion>
  `,
})
export class AccordionDemoComponent {}
