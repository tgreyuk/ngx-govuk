import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukRadio, NgxGovukRadios } from 'ngx-govuk/radios';

@Component({
  selector: 'app-changed-name',
  imports: [ReactiveFormsModule, NgxGovukRadios, NgxGovukRadio],
  templateUrl: './changed-name.component.html',
})
export class ChangedNameComponent {
  changedNameControl = new FormControl<string | null>(null);
}
