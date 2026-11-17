import { Component } from '@angular/core';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';
import { NgxGovukErrorSummary } from 'ngx-govuk/error-summary';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-error-summary-demo',
  imports: [
    NgxGovukErrorMessage,
    NgxGovukErrorSummary,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './default.component.html',
})
export class ErrorSummaryDemoComponent {}
