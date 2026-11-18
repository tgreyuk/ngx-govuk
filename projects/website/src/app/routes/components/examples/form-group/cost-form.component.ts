import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxGovukButton } from 'ngx-govuk/button';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-cost-form',
  imports: [
    ReactiveFormsModule,
    NgxGovukButton,
    NgxGovukErrorMessage,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './cost-form.component.html',
})
export class CostFormComponent {
  form = new FormGroup({
    cost: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
    ]),
  });

  // GOV.UK: validate when the user tries to continue, not when they leave a
  // field.
  submitted = signal(false);

  continue() {
    this.submitted.set(true);
  }

  costError() {
    const errors = this.form.controls.cost.errors;
    if (errors?.['required']) {
      return 'Enter the cost per item';
    }
    if (errors?.['pattern']) {
      return 'Cost per item must be an amount of money, like 4 or 4.50';
    }
    return null;
  }
}
