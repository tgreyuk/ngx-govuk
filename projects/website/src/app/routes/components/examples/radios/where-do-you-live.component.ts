import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukRadio, NgxGovukRadios } from 'ngx-govuk/radios';

@Component({
  selector: 'app-where-do-you-live',
  imports: [ReactiveFormsModule, NgxGovukRadios, NgxGovukRadio],
  templateUrl: './where-do-you-live.component.html',
})
export class WhereDoYouLiveComponent {
  whereDoYouLiveControl = new FormControl<string | null>(null);
}
