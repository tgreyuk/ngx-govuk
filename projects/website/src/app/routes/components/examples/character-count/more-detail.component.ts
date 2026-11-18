import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukCharacterCount } from 'ngx-govuk/character-count';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

@Component({
  selector: 'app-more-detail',
  imports: [ReactiveFormsModule, NgxGovukCharacterCount, NgxGovukTextarea],
  templateUrl: './more-detail.component.html',
})
export class MoreDetailComponent {
  moreDetailControl = new FormControl('');
}
