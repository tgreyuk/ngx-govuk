import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';
import {
  NgxGovukErrorSummary,
  NgxGovukErrorSummaryItem,
} from 'ngx-govuk/error-summary';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-error-summary',
  imports: [
    ReactiveFormsModule,
    NgxGovukErrorMessage,
    NgxGovukErrorSummary,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './error-summary.component.html',
})
export class ErrorSummaryComponent {
  eventNameControl = new FormControl('');

  errors: NgxGovukErrorSummaryItem[] = [
    { text: 'Enter the name of the event', control: this.eventNameControl },
  ];
}
