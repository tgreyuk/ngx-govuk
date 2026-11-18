import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgxGovukSummaryActionLink,
  NgxGovukSummaryList,
  NgxGovukSummaryListAction,
  NgxGovukSummaryListRow,
} from 'ngx-govuk/summary-list';

@Component({
  selector: 'app-summary-list-demo',
  imports: [
    RouterLink,
    NgxGovukSummaryList,
    NgxGovukSummaryListRow,
    NgxGovukSummaryListAction,
    NgxGovukSummaryActionLink,
  ],
  templateUrl: './default.component.html',
})
export class SummaryListDemoComponent {}
