import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  NgxGovukDateInput,
  NgxGovukDateInputValue,
} from 'ngx-govuk/date-input';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';

@Component({
  selector: 'app-passport-issued',
  imports: [ReactiveFormsModule, NgxGovukDateInput, NgxGovukErrorMessage],
  templateUrl: './passport-issued.component.html',
})
export class PassportIssuedComponent {
  passportIssuedControl = new FormControl<NgxGovukDateInputValue | null>(null);
}
