import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxGovukBackLink } from 'ngx-govuk/back-link';

@Component({
  selector: 'app-back-link-demo',
  imports: [RouterLink, NgxGovukBackLink],
  templateUrl: './default.component.html',
})
export class BackLinkDemoComponent {}
