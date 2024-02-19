import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxGovukAccordionComponent } from 'ngx-govuk/accordion';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NgxGovukAccordionComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'ngx-govuk-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-govuk-demo';
}
