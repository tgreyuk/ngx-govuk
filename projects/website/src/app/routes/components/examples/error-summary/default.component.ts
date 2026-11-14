import { Component } from '@angular/core';
import { NgxGovukErrorSummary } from 'ngx-govuk/error-summary';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-error-summary-demo',
  imports: [NgxGovukErrorSummary, NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './default.component.html',
})
export class ErrorSummaryDemoComponent {}
