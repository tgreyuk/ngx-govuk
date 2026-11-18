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
  fullWidthControl = new FormControl('');
  threeQuartersWidthControl = new FormControl('');
  twoThirdsWidthControl = new FormControl('');
  oneHalfWidthControl = new FormControl('');
  oneThirdWidthControl = new FormControl('');
  oneQuarterWidthControl = new FormControl('');
}
