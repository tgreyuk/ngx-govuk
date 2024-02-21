import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngx-govuk-get-started',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetStartedComponent {
  INSTALL_CODE = `npm install govuk-frontend ngx-govuk --save`;

  STYLES_CODE = `"styles": [
  "node_modules/govuk-frontend/dist/govuk/all.scss"
]`;

  CHERRY_PICK_STYLES = `@import "node_modules/govuk-frontend/dist/govuk/base";
@import "node_modules/govuk-frontend/dist/govuk/core/all";
@import "node_modules/govuk-frontend/dist/govuk/objects/all";
@import "node_modules/govuk-frontend/dist/govuk/components/footer/index";
@import "node_modules/govuk-frontend/dist/govuk/components/header/index";
@import "node_modules/govuk-frontend/dist/govuk/utilities/all";
@import "node_modules/govuk-frontend/dist/govuk/overrides/all";`;

  COMPONENT_CODE = `import { NgxGovukExample } from 'ngx-govuk/example';

@Component({
  selector: 'app-some-component',
  standalone: true,
  imports: [CommonModule, NgxGovukExample],
  template: '<ngx-govuk-example></ngx-govuk-example>',
})`;

  COMPONENT_INPUT_CODE = `<ngx-gov-uk-example [input]="'value'" (output)="someMethod()"></ngx-govuk-example>`;

  COMPONENT_PROP_CODE = `<ngx-gov-uk-example #myComponent></ngx-govuk-example>

Print property value: {{ myComponent.someProperty() }}

<button (click)="myComponent.someMethod()">Click me</button>
`;
}
