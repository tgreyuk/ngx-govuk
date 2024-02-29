import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxGovukBackLink } from 'ngx-govuk/back-link';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, NgxGovukBackLink],
  template: `<a ngxGovukBackLink>Back</a>`,
})
export class BackLinkDemoComponent {}
