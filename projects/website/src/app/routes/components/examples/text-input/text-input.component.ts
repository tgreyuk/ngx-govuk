import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './text-input.component.html',
})
export class TextInputComponent {
  eventNameControl = new FormControl('');
}
