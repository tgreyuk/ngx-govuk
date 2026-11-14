import { Component } from '@angular/core';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

@Component({
  selector: 'app-textarea-demo',
  imports: [NgxGovukFormGroup, NgxGovukTextarea],
  templateUrl: './default.component.html',
})
export class TextareaDemoComponent {}
