import { Component } from '@angular/core';
import {
  NgxGovukRadio,
  NgxGovukRadios,
  NgxGovukRadiosDivider,
} from 'ngx-govuk/radios';

@Component({
  selector: 'app-radios-divider-demo',
  imports: [NgxGovukRadios, NgxGovukRadio, NgxGovukRadiosDivider],
  templateUrl: './divider.component.html',
})
export class RadiosDividerDemoComponent {}
