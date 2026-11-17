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
  byEmail = new FormControl(false);
  byPhone = new FormControl(false);
  byText = new FormControl(false);
  email = new FormControl('');
  phone = new FormControl('');
  mobile = new FormControl('');
}
