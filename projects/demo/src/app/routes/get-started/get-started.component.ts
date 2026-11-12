import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface TocEntry {
  heading: string | null;
  id: string;
  subheadings?: TocEntry[];
}

@Component({
  selector: 'ngx-govuk-get-started',
  imports: [RouterLink],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetStartedComponent implements AfterViewInit {
  contents = viewChild<ElementRef<HTMLDivElement>>('contents');
  private renderer = inject(Renderer2);

  toc = signal<TocEntry[]>([]);

  ngAfterViewInit(): void {
    const toc: TocEntry[] = [];

    const headings = this.contents()?.nativeElement?.querySelectorAll('h2');

    headings?.forEach((heading, i) => {
      this.renderer.setAttribute(heading, 'id', `heading-${i}`);
      const subheadings = Array.from(
        heading.parentElement?.querySelectorAll('h3') || [],
      )?.map((subheading, x) => {
        this.renderer.setAttribute(
          subheading,
          'id',
          `heading-${i}-subheading-${x}`,
        );
        return {
          heading: subheading.textContent,
          id: `subheading-${x}`,
        };
      });
      toc.push({
        heading: heading.textContent,
        id: `heading-${i}`,
        subheadings,
      });
    });

    this.toc.set(toc);
  }

  INSTALL_CODE = `npm install ngx-govuk govuk-frontend`;

  BODY_CSS_CODE =
    '<body class="govuk-template__body govuk-frontend-supported">';

  SASS_ALL_CODE = `// styles.scss
@use 'govuk-frontend' with (
  $govuk-font-family: (arial, sans-serif)
);`;

  SASS_CHERRY_PICK_CODE = `// styles.scss
@use 'govuk-frontend/dist/govuk/base' with (
  $govuk-font-family: (arial, sans-serif)
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

  COMPONENT_CODE = `import { Component } from '@angular/core';
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

  COMPONENT_INPUT_CODE = `<button ngxGovukButton buttonType="secondary" (click)="save()">
  Save as draft
</button>`;

  COMPONENT_METHOD_CODE = `<ngx-govuk-accordion #accordion>
  <ngx-govuk-accordion-panel heading="Section 1">
    Content
  </ngx-govuk-accordion-panel>
</ngx-govuk-accordion>

<button ngxGovukButton (click)="accordion.toggle()">
  Show or hide all sections
</button>`;
}
