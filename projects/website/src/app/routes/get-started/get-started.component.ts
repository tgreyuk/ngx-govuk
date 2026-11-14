import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../components/component-code/code-block.component';

/** Guide to installing ngx-govuk and GOV.UK Frontend. */
@Component({
  selector: 'ngx-govuk-get-started',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
})
export class GetStartedComponent {
  /** The page's sections, in order. Each id matches a heading's id. */
  contents = [
    { id: 'requirements', heading: 'Requirements' },
    { id: 'install', heading: 'Install packages from npm' },
    { id: 'page-classes', heading: 'Add GOV.UK classes to the page' },
    { id: 'styles', heading: 'Include GOV.UK styles' },
    { id: 'font', heading: 'Choose a font' },
  ];

  INSTALL_CODE = `npm install ngx-govuk govuk-frontend`;

  BODY_CSS_CODE = `<html lang="en" class="govuk-template">
  <body class="govuk-template__body govuk-frontend-supported">`;

  SASS_ALL_CODE = `// styles.scss
@use 'govuk-frontend' with (
  $govuk-font-family: ("Helvetica Neue", Helvetica, Arial, sans-serif)
);`;

  SASS_CHERRY_PICK_CODE = `// styles.scss
@use 'govuk-frontend/dist/govuk/base' with (
  $govuk-font-family: ("Helvetica Neue", Helvetica, Arial, sans-serif)
);
@use 'govuk-frontend/dist/govuk/core';
@use 'govuk-frontend/dist/govuk/objects';
@use 'govuk-frontend/dist/govuk/components/button';
@use 'govuk-frontend/dist/govuk/components/details';
@use 'govuk-frontend/dist/govuk/components/error-message';
@use 'govuk-frontend/dist/govuk/components/hint';
@use 'govuk-frontend/dist/govuk/components/input';
@use 'govuk-frontend/dist/govuk/components/label';
@use 'govuk-frontend/dist/govuk/utilities';
@use 'govuk-frontend/dist/govuk/overrides';`;

  PRECOMPILED_CODE = `// angular.json, in your project's build options
"styles": [
  "node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css"
],
"assets": [
  {
    "glob": "**/*",
    "input": "node_modules/govuk-frontend/dist/govuk/assets",
    "output": "assets"
  }
]`;
}
