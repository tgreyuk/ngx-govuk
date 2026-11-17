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
  selector: 'app-event-name',
  imports: [
    ReactiveFormsModule,
    NgxGovukErrorMessage,
    NgxGovukErrorSummary,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './event-name.component.html',
})
export class EventNameComponent {
  eventName = new FormControl('');

  errors: NgxGovukErrorSummaryItem[] = [
    { text: 'Enter the name of the event', fieldId: 'event-name' },
  ];
}
