import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

@Component({
  selector: 'app-textarea',
  imports: [ReactiveFormsModule, NgxGovukFormGroup, NgxGovukTextarea],
  templateUrl: './textarea.component.html',
})
export class TextareaComponent {
  moreDetailControl = new FormControl('');
}
