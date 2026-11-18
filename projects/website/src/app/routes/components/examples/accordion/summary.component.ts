import { Component } from '@angular/core';
import { NgxGovukAccordion, NgxGovukAccordionPanel } from 'ngx-govuk/accordion';

@Component({
  selector: 'app-accordion-summary-demo',
  imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
  templateUrl: './summary.component.html',
})
export class AccordionSummaryDemoComponent {}
