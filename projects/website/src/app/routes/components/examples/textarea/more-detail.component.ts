import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

@Component({
  selector: 'app-more-detail',
  imports: [ReactiveFormsModule, NgxGovukFormGroup, NgxGovukTextarea],
  templateUrl: './more-detail.component.html',
})
export class MoreDetailComponent {
  moreDetailControl = new FormControl('');
}
