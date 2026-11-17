import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukSelect } from 'ngx-govuk/select';

@Component({
  selector: 'app-sort-by',
  imports: [ReactiveFormsModule, NgxGovukFormGroup, NgxGovukSelect],
  templateUrl: './sort-by.component.html',
})
export class SortByComponent {
  sort = new FormControl('updated');
}
