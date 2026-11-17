import { Component } from '@angular/core';
import { NgxGovukErrorMessage } from 'ngx-govuk/error-message';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-error-message-custom-prefix-demo',
  imports: [NgxGovukErrorMessage, NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './custom-prefix.component.html',
})
export class ErrorMessageCustomPrefixDemoComponent {}
