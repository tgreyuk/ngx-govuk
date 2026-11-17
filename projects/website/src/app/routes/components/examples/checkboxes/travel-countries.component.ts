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
  franceControl = new FormControl(false);
  portugalControl = new FormControl(false);
  spainControl = new FormControl(false);
  noneControl = new FormControl(false);
}
