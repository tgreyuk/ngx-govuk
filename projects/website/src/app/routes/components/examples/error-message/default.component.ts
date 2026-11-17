import { Component } from '@angular/core';
import { NgxGovukDateInput } from 'ngx-govuk/date-input';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';

@Component({
  selector: 'app-error-message-demo',
  imports: [NgxGovukDateInput, NgxGovukErrorMessage],
  templateUrl: './default.component.html',
})
export class ErrorMessageDemoComponent {}
