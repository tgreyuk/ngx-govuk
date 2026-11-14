import { Component } from '@angular/core';
import {
  NgxGovukCheckbox,
  NgxGovukCheckboxes,
  NgxGovukCheckboxesDivider,
} from 'ngx-govuk/checkboxes';

@Component({
  selector: 'app-checkboxes-none-demo',
  imports: [NgxGovukCheckboxes, NgxGovukCheckbox, NgxGovukCheckboxesDivider],
  templateUrl: './none.component.html',
})
export class CheckboxesNoneDemoComponent {}
