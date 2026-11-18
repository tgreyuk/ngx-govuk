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
  width20Control = new FormControl('');
  width10Control = new FormControl('');
  width5Control = new FormControl('');
  width4Control = new FormControl('');
  width3Control = new FormControl('');
  width2Control = new FormControl('');
}
