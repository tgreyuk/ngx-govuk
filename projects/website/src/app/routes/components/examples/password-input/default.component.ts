import { Component } from '@angular/core';
import { NgxGovukPasswordInput } from 'ngx-govuk/password-input';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-password-input-demo',
  imports: [NgxGovukPasswordInput, NgxGovukTextInput],
  templateUrl: './default.component.html',
})
export class PasswordInputDemoComponent {}
