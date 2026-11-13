import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxGovukButton } from 'ngx-govuk/button';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-form-group-demo',
  imports: [
    ReactiveFormsModule,
    NgxGovukButton,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="continue()" novalidate>
      <ngx-govuk-form-group
        label="What is the cost per item, in pounds?"
        hint="Leave it blank or type a letter, then select Continue"
        [errorMessage]="submitted() ? costError() : null"
        labelSize="m"
        prefix="£"
        suffix="per item"
      >
        <input
          id="cost"
          type="text"
          inputmode="decimal"
          spellcheck="false"
          formControlName="cost"
          ngxGovukTextInput
          inputWidth="5"
        />
      </ngx-govuk-form-group>

      <button type="submit" ngxGovukButton>Continue</button>
    </form>
  `,
})
export class FormGroupDemoComponent {
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
