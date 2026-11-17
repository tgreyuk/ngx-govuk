import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxGovukTab, NgxGovukTabs } from 'ngx-govuk/tabs';

@Component({
  selector: 'app-tabs-routed-demo',
  imports: [NgxGovukTabs, NgxGovukTab, RouterOutlet],
  templateUrl: './routed.component.html',
})
export class TabsRoutedDemoComponent {}
