import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukPasswordInput } from 'ngx-govuk/password-input';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-password',
  imports: [ReactiveFormsModule, NgxGovukPasswordInput, NgxGovukTextInput],
  templateUrl: './password.component.html',
})
export class PasswordComponent {
  password = new FormControl('');
}
