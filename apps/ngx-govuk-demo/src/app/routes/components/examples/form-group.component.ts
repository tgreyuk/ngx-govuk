import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-form-group-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  template: `<ngx-govuk-form-group
      label="What is the name of the event?"
      [asPageHeading]="true"
    >
      <input type="text" ngxGovukTextInput />
    </ngx-govuk-form-group>

    <form [formGroup]="form">
      <ngx-govuk-form-group
        label="What is the cost per item, in pounds?"
        hint="Type in a letter to see an error"
        errorMessage="Value must be a number"
        [asPageHeading]="true"
        prefix="£"
        suffix="Per item"
      >
        <input formControlName="costControl" type="text" ngxGovukTextInput />
      </ngx-govuk-form-group>
    </form>`,
})
export class FormGroupDemoComponent {
  form = new FormGroup({
    costControl: new FormControl('', [Validators.pattern(/^[0-9]+$/)]),
  });
}
