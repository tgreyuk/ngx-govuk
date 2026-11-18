import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../components/component-code/code-block.component';

/** Guide to importing components and using their inputs, outputs and methods. */
@Component({
  selector: 'ngx-govuk-using-components',
  host: { class: 'app-numbered-sections' },
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './using-components.component.html',
})
export class UsingComponentsComponent {
  contents = [
    { id: 'import-components', heading: 'Import components' },
    { id: 'native-elements', heading: 'Native elements' },
    { id: 'classes-and-attributes', heading: 'Classes and attributes' },
    { id: 'components-with-parts', heading: 'Components with parts' },
    { id: 'inputs', heading: 'Inputs' },
    { id: 'two-way-binding', heading: 'Two-way binding' },
    { id: 'methods', heading: 'Methods' },
    { id: 'links-and-the-router', heading: 'Links and the router' },
    { id: 'form-fields', heading: 'Form fields' },
  ];

  IMPORT_CODE = `import { Component } from '@angular/core';
import { NgxGovukButton } from 'ngx-govuk/button';
import { NgxGovukDetails } from 'ngx-govuk/details';

@Component({
  selector: 'app-example',
  imports: [NgxGovukButton, NgxGovukDetails],
  template: \`
    <details ngxGovukDetails summaryText="Help with this page">
      Contact us if you need help.
    </details>
    <button ngxGovukButton>Save and continue</button>
  \`,
})
export class ExampleComponent {}`;

  DIRECTIVE_CODE = `<button ngxGovukButton type="submit" [disabled]="saving()">
  Save and continue
</button>

<a ngxGovukButton routerLink="/apply">Start now</a>

<a ngxGovukBackLink routerLink="/apply/address">Back</a>`;

  NATIVE_CODE = `<details ngxGovukDetails summaryText="Help with nationality" [open]="showHelp()">
  We need to know your nationality so we can work out which elections you can vote in.
</details>

<nav ngxGovukBreadcrumbs>
  <a *ngxGovukBreadcrumbsItem routerLink="/">Home</a>
  <a *ngxGovukBreadcrumbsItem routerLink="/passports">Passports</a>
</nav>`;

  CLASSES_CODE = `<ngx-govuk-panel id="confirmation" class="govuk-!-margin-bottom-0" titleText="Application complete">
  Your reference number<br /><strong>HDJ2123F</strong>
</ngx-govuk-panel>`;

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
