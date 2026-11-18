import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  NgxGovukRadio,
  NgxGovukRadios,
  NgxGovukRadiosDivider,
} from 'ngx-govuk/radios';

@Component({
  selector: 'app-where-do-you-live-or-abroad',
  imports: [
    ReactiveFormsModule,
    NgxGovukRadios,
    NgxGovukRadio,
    NgxGovukRadiosDivider,
  ],
  templateUrl: './where-do-you-live-or-abroad.component.html',
})
export class WhereDoYouLiveOrAbroadComponent {
  whereDoYouLiveControl = new FormControl<string | null>(null);
}
