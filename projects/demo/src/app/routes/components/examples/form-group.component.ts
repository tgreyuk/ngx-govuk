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
  imports: [ReactiveFormsModule, NgxGovukFormGroup, NgxGovukTextInput],
  template: `<ngx-govuk-form-group
      label="What is the name of the event?"
      hint="The name you'll use on promotional material"
      [asPageHeading]="true"
    >
      <input id="event-name" type="text" ngxGovukTextInput />
    </ngx-govuk-form-group>

    <form [formGroup]="form">
      <ngx-govuk-form-group
        label="What is the cost per item, in pounds?"
        hint="Type a letter, then leave the field, to see an error"
        [errorMessage]="
          cost.invalid && cost.touched ? 'Enter the cost as a number' : null
        "
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
    </form>`,
})
export class FormGroupDemoComponent {
  form = new FormGroup({
    cost: new FormControl('', [Validators.pattern(/^[0-9.]+$/)]),
  });

  get cost() {
    return this.form.controls.cost;
  }
}
