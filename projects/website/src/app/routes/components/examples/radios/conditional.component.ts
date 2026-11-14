import { Component } from '@angular/core';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import {
  NgxGovukRadio,
  NgxGovukRadioConditional,
  NgxGovukRadios,
} from 'ngx-govuk/radios';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-radios-conditional-demo',
  imports: [
    NgxGovukRadios,
    NgxGovukRadio,
    NgxGovukRadioConditional,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './conditional.component.html',
})
export class RadiosConditionalDemoComponent {}
