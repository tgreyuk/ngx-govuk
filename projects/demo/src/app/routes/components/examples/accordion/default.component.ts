import { Component } from '@angular/core';
import { NgxGovukAccordion, NgxGovukAccordionPanel } from 'ngx-govuk/accordion';

@Component({
  selector: 'app-accordion-demo',
  imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
  templateUrl: './default.component.html',
})
export class AccordionDemoComponent {}
