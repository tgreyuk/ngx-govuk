import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukCheckbox, NgxGovukCheckboxes } from 'ngx-govuk/checkboxes';

@Component({
  selector: 'app-waste-types',
  imports: [ReactiveFormsModule, NgxGovukCheckboxes, NgxGovukCheckbox],
  templateUrl: './waste-types.component.html',
})
export class WasteTypesComponent {
  animalCarcasses = new FormControl(false);
  minesOrQuarries = new FormControl(false);
  farmOrAgricultural = new FormControl(false);
}
