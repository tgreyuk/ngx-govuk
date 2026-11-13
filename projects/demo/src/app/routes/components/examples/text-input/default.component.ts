import { Component } from '@angular/core';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-text-input-demo',
  imports: [NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './default.component.html',
})
export class TextInputDemoComponent {}
