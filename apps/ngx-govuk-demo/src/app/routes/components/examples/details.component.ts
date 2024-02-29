import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxGovukDetails } from 'ngx-govuk/details';

@Component({
  selector: 'app-details-demo',
  standalone: true,
  imports: [CommonModule, NgxGovukDetails],
  template: `<ngx-govuk-details summaryText="Help with nationality">
    We need to know your nationality so we can work out which elections you're
    entitled to vote in. If you cannot provide your nationality, you'll have to
    send copies of identity documents through the post.
  </ngx-govuk-details>`,
})
export class DetailsDemoComponent {}
