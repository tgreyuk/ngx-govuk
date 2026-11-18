import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-full-name',
  imports: [
    ReactiveFormsModule,
    NgxGovukErrorMessage,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './full-name.component.html',
})
export class FullNameComponent {
  fullNameControl = new FormControl('');
}
