import { Component } from '@angular/core';
import { NgxGovukFieldset } from 'ngx-govuk/fieldset';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-fieldset-demo',
  imports: [NgxGovukFieldset, NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './default.component.html',
})
export class FieldsetDemoComponent {}
