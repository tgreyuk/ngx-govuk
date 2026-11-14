import { Component } from '@angular/core';
import { NgxGovukCheckbox, NgxGovukCheckboxes } from 'ngx-govuk/checkboxes';

@Component({
  selector: 'app-checkboxes-demo',
  imports: [NgxGovukCheckboxes, NgxGovukCheckbox],
  templateUrl: './default.component.html',
})
export class CheckboxesDemoComponent {}
