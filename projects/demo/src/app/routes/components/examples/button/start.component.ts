import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxGovukButton } from 'ngx-govuk/button';

@Component({
  selector: 'app-button-start-demo',
  imports: [RouterLink, NgxGovukButton],
  templateUrl: './start.component.html',
})
export class ButtonStartDemoComponent {}
