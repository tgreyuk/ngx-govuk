import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  NgxGovukCheckbox,
  NgxGovukCheckboxConditional,
  NgxGovukCheckboxes,
} from 'ngx-govuk/checkboxes';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-contact-methods',
  imports: [
    ReactiveFormsModule,
    NgxGovukCheckboxes,
    NgxGovukCheckbox,
    NgxGovukCheckboxConditional,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './contact-methods.component.html',
})
export class ContactMethodsComponent {
  byEmailControl = new FormControl(false);
  byPhoneControl = new FormControl(false);
  byTextControl = new FormControl(false);
  emailControl = new FormControl('');
  phoneControl = new FormControl('');
  mobileControl = new FormControl('');
}
