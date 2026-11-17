import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  NgxGovukCheckbox,
  NgxGovukCheckboxes,
  NgxGovukCheckboxesDivider,
} from 'ngx-govuk/checkboxes';

@Component({
  selector: 'app-travel-countries',
  imports: [
    ReactiveFormsModule,
    NgxGovukCheckboxes,
    NgxGovukCheckbox,
    NgxGovukCheckboxesDivider,
  ],
  templateUrl: './travel-countries.component.html',
})
export class TravelCountriesComponent {
  france = new FormControl(false);
  portugal = new FormControl(false);
  spain = new FormControl(false);
  none = new FormControl(false);
}
