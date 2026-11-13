import { Component } from '@angular/core';
import { NgxGovukRadio, NgxGovukRadios } from 'ngx-govuk/radios';

@Component({
  selector: 'app-radios-demo',
  imports: [NgxGovukRadios, NgxGovukRadio],
  templateUrl: './default.component.html',
})
export class RadiosDemoComponent {}
