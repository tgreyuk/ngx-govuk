import { Component } from '@angular/core';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-text-input-fluid-width-demo',
  imports: [NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './fluid-width.component.html',
})
export class TextInputFluidWidthDemoComponent {}
