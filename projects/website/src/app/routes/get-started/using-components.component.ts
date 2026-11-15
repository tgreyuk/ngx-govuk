import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../components/component-code/code-block.component';

/** Guide to importing components and using their inputs, outputs and methods. */
@Component({
  selector: 'ngx-govuk-using-components',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './using-components.component.html',
})
export class UsingComponentsComponent {
  IMPORT_CODE = `import { Component } from '@angular/core';
import { NgxGovukButton } from 'ngx-govuk/button';
import { NgxGovukDetails } from 'ngx-govuk/details';

@Component({
  selector: 'app-example',
  imports: [NgxGovukButton, NgxGovukDetails],
  template: \`
    <ngx-govuk-details summaryText="Help with this page">
      Contact us if you need help.
    </ngx-govuk-details>
    <button ngxGovukButton>Save and continue</button>
  \`,
})
export class ExampleComponent {}`;

  DIRECTIVE_CODE = `<button ngxGovukButton type="submit" [disabled]="saving()">
  Save and continue
</button>

<a ngxGovukButton routerLink="/apply">Start now</a>

<a ngxGovukBackLink routerLink="/apply/address">Back</a>`;

  PARTS_CODE = `import { NgxGovukAccordion, NgxGovukAccordionPanel } from 'ngx-govuk/accordion';

@Component({
  imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
  template: \`
    <ngx-govuk-accordion>
      <ngx-govuk-accordion-panel heading="Understanding your situation">
        …
      </ngx-govuk-accordion-panel>
    </ngx-govuk-accordion>
  \`,
})
export class GuidanceComponent {}`;

  ROUTER_CODE = `navigation: NgxGovukServiceNavigationItem[] = [
  { text: 'Applications', routerLink: '/applications' },
  { text: 'Messages', routerLink: '/messages' },
];`;

  INPUT_CODE = `<button ngxGovukButton buttonType="secondary">Save as draft</button>`;

  MODEL_CODE = `<ngx-govuk-tabs [(selectedIndex)]="openTab">
  <ngx-govuk-tab label="Past day">…</ngx-govuk-tab>
  <ngx-govuk-tab label="Past week">…</ngx-govuk-tab>
</ngx-govuk-tabs>`;

  CONTROL_CODE = `<ngx-govuk-radios legend="Where do you live?" formControlName="country">
  <ngx-govuk-radio value="england">England</ngx-govuk-radio>
  <ngx-govuk-radio value="scotland">Scotland</ngx-govuk-radio>
</ngx-govuk-radios>

<ngx-govuk-checkboxes legend="How would you like to be contacted?">
  <ngx-govuk-checkbox formControlName="byEmail">Email</ngx-govuk-checkbox>
  <ngx-govuk-checkbox formControlName="byPhone">Phone</ngx-govuk-checkbox>
</ngx-govuk-checkboxes>`;

  METHOD_CODE = `<ngx-govuk-accordion #accordion>
  <ngx-govuk-accordion-panel heading="Section 1">
    Content
  </ngx-govuk-accordion-panel>
</ngx-govuk-accordion>

<button ngxGovukButton (click)="accordion.toggle()">
  Show or hide all sections
</button>`;
}
