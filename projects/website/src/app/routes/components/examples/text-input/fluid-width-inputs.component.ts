import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-fluid-width-inputs',
  imports: [ReactiveFormsModule, NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './fluid-width-inputs.component.html',
})
export class FluidWidthInputsComponent {
  fullWidth = new FormControl('');
  threeQuartersWidth = new FormControl('');
  twoThirdsWidth = new FormControl('');
  oneHalfWidth = new FormControl('');
  oneThirdWidth = new FormControl('');
  oneQuarterWidth = new FormControl('');
}
