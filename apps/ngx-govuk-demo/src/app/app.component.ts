import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxGovukAccordion } from 'ngx-govuk/accordion';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NgxGovukAccordion,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'ngx-govuk-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-govuk-demo';
}
