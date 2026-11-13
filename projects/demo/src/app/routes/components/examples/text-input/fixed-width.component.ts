import { Component } from '@angular/core';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-text-input-fixed-width-demo',
  imports: [NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './fixed-width.component.html',
})
export class TextInputFixedWidthDemoComponent {}
