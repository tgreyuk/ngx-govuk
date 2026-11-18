import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import {
  NgxGovukRadio,
  NgxGovukRadioConditional,
  NgxGovukRadios,
} from 'ngx-govuk/radios';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-contact-preference',
  imports: [
    ReactiveFormsModule,
    NgxGovukRadios,
    NgxGovukRadio,
    NgxGovukRadioConditional,
    NgxGovukFormGroup,
    NgxGovukTextInput,
  ],
  templateUrl: './contact-preference.component.html',
})
export class ContactPreferenceComponent {
  contactControl = new FormControl<string | null>(null);
  emailControl = new FormControl('');
  phoneControl = new FormControl('');
  mobileControl = new FormControl('');
}
