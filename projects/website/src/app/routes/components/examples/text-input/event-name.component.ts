import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-event-name',
  imports: [ReactiveFormsModule, NgxGovukFormGroup, NgxGovukTextInput],
  templateUrl: './event-name.component.html',
})
export class EventNameComponent {
  eventName = new FormControl('');
}
