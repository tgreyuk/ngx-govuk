import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxGovukFeedback } from 'ngx-govuk/feedback';

@Component({
  selector: 'app-feedback-demo',
  imports: [RouterLink, NgxGovukFeedback],
  templateUrl: './default.component.html',
})
export class FeedbackDemoComponent {}
