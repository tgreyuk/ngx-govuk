import { Component } from '@angular/core';
import {
  NgxGovukCheckbox,
  NgxGovukCheckboxConditional,
  NgxGovukCheckboxes,
} from 'ngx-govuk/checkboxes';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-checkboxes-conditional-demo',
  imports: [
    NgxGovukCheckboxes,
    NgxGovukCheckbox,
    NgxGovukCheckboxConditional,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './conditional.component.html',
})
export class CheckboxesConditionalDemoComponent {}
