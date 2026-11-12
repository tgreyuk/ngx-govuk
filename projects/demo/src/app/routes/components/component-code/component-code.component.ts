import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { NgxGovukAccordion, NgxGovukAccordionPanel } from 'ngx-govuk/accordion';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-govuk-example',
  imports: [
    CommonModule,
    HttpClientModule,
    NgxGovukAccordion,
    NgxGovukAccordionPanel,
  ],
  templateUrl: './component-code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentCodeComponent implements OnInit {
  componentId = input<string>();
  codeSnippet$!: Observable<string>;

  private http = inject(HttpClient);

  ngOnInit() {
    this.codeSnippet$ = this.http.get(
      `./examples/${this.componentId()}.component.ts`,
      {
        responseType: 'text',
      },
    );
  }
}
