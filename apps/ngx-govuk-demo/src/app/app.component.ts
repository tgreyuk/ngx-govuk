import { Component } from '@angular/core';
import { NgxGovukAccordionComponent } from 'ngx-govuk/accordion';

@Component({
  standalone: true,
  imports: [NgxGovukAccordionComponent],
  selector: 'ngx-govuk-root',
  template: ` <ngx-govuk-accordion></ngx-govuk-accordion>`,
})
export class AppComponent {
  title = 'ngx-govuk-demo';
}
