import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-fixed-width-inputs',
  imports: [ReactiveFormsModule, NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './fixed-width-inputs.component.html',
})
export class FixedWidthInputsComponent {
  width20 = new FormControl('');
  width10 = new FormControl('');
  width5 = new FormControl('');
  width4 = new FormControl('');
  width3 = new FormControl('');
  width2 = new FormControl('');
}
