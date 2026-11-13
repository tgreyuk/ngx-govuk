import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../components/component-code/code-block.component';

/** Guide to importing components and using their inputs, outputs and methods. */
@Component({
  selector: 'ngx-govuk-using-components',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './using-components.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  INPUT_CODE = `<button ngxGovukButton buttonType="secondary" (click)="save()">
  Save as draft
</button>`;

  METHOD_CODE = `<ngx-govuk-accordion #accordion>
  <ngx-govuk-accordion-panel heading="Section 1">
    Content
  </ngx-govuk-accordion-panel>
</ngx-govuk-accordion>

<button ngxGovukButton (click)="accordion.toggle()">
  Show or hide all sections
</button>`;
}
