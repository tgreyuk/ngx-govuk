import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  NgxGovukAccordionComponent,
  NgxGovukAccordionPanelComponent,
} from 'ngx-govuk/accordion';
import { NgxGovukBackLinkDirective } from 'ngx-govuk/back-link';
import {
  NgxGovukTabsComponent,
  NgxGovukTabsLinkDirective,
  NgxGovukTabsPanelComponent,
  NgxGovukTabsTabComponent,
} from 'ngx-govuk/tabs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NgxGovukAccordionComponent,
    NgxGovukAccordionPanelComponent,
    NgxGovukTabsComponent,
    NgxGovukTabsLinkDirective,
    NgxGovukTabsPanelComponent,
    NgxGovukBackLinkDirective,
    NgxGovukTabsTabComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  COMPONENT_CODE = `import {
  NgxGovukAccordionComponent,
  NgxGovukAccordionPanelComponent
} from 'ngx-govuk/accordion';`;

  HTML_CODE = `<ngx-govuk-accordion>
  <ngx-govuk-accordion-panel heading="Writing well for the web">
    <p class="govuk-body">
      This is the content for Writing well for the web.
    </p>
  </ngx-govuk-accordion-panel>
  <ngx-govuk-accordion-panel heading="Writing well for specialists"
    ><p class="govuk-body">
      This is the content for Writing well for specialists.
    </p></ngx-govuk-accordion-panel
  >
  <ngx-govuk-accordion-panel heading="Know your audience"
    ><p class="govuk-body">
      This is the content for Know your audience.
    </p></ngx-govuk-accordion-panel
  >
  <ngx-govuk-accordion-panel heading="How people read"
    ><p class="govuk-body">
      This is the content for How people read.
    </p></ngx-govuk-accordion-panel
  >
</ngx-govuk-accordion>`;
}
