import { Component } from '@angular/core';
import { NgxGovukButton, NgxGovukButtonGroup } from 'ngx-govuk/button';

@Component({
  selector: 'app-button-group-demo',
  imports: [NgxGovukButton, NgxGovukButtonGroup],
  templateUrl: './group.component.html',
})
export class ButtonGroupDemoComponent {}
