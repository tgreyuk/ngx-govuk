import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukCharacterCount } from 'ngx-govuk/character-count';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

@Component({
  selector: 'app-job-description',
  imports: [ReactiveFormsModule, NgxGovukCharacterCount, NgxGovukTextarea],
  templateUrl: './job-description.component.html',
})
export class JobDescriptionComponent {
  jobDescription = new FormControl('');
}
