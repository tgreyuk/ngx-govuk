
import { Component } from '@angular/core';
import { NgxGovukBackLink } from 'ngx-govuk/back-link';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [NgxGovukBackLink],
  template: `<a ngxGovukBackLink>Back</a>`,
})
export class BackLinkDemoComponent {}
