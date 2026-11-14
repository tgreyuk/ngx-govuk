import { Component } from '@angular/core';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukSelect } from 'ngx-govuk/select';

@Component({
  selector: 'app-select-demo',
  imports: [NgxGovukFormGroup, NgxGovukSelect],
  templateUrl: './default.component.html',
})
export class SelectDemoComponent {}
