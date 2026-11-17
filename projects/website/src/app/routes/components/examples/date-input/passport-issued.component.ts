import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  NgxGovukDateInput,
  NgxGovukDateInputValue,
} from 'ngx-govuk/date-input';

@Component({
  selector: 'app-passport-issued',
  imports: [ReactiveFormsModule, NgxGovukDateInput],
  templateUrl: './passport-issued.component.html',
})
export class PassportIssuedComponent {
  passportIssued = new FormControl<NgxGovukDateInputValue | null>(null);
}
