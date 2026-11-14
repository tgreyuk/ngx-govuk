import { Component } from '@angular/core';
import {
  NgxGovukTable,
  NgxGovukTableBody,
  NgxGovukTableCaption,
  NgxGovukTableCell,
  NgxGovukTableHead,
  NgxGovukTableHeader,
  NgxGovukTableRow,
} from 'ngx-govuk/table';

@Component({
  selector: 'app-table-demo',
  imports: [
    NgxGovukTable,
    NgxGovukTableCaption,
    NgxGovukTableHead,
    NgxGovukTableBody,
    NgxGovukTableRow,
    NgxGovukTableHeader,
    NgxGovukTableCell,
  ],
  templateUrl: './default.component.html',
})
export class TableDemoComponent {}
