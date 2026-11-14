import { Component } from '@angular/core';
import { NgxGovukTab, NgxGovukTabs } from 'ngx-govuk/tabs';

@Component({
  selector: 'app-tabs-demo',
  imports: [NgxGovukTabs, NgxGovukTab],
  templateUrl: './default.component.html',
})
export class TabsDemoComponent {}
