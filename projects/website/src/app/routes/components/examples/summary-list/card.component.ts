import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgxGovukSummaryActionLink,
  NgxGovukSummaryCard,
  NgxGovukSummaryCardAction,
  NgxGovukSummaryList,
  NgxGovukSummaryListRow,
} from 'ngx-govuk/summary-list';

@Component({
  selector: 'app-summary-list-card-demo',
  imports: [
    RouterLink,
    NgxGovukSummaryCard,
    NgxGovukSummaryCardAction,
    NgxGovukSummaryList,
    NgxGovukSummaryListRow,
    NgxGovukSummaryActionLink,
  ],
  templateUrl: './card.component.html',
})
export class SummaryListCardDemoComponent {}
