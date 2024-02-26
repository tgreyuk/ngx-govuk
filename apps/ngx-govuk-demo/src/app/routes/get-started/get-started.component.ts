import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'ngx-govuk-get-started',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetStartedComponent implements AfterViewInit {
  contents = viewChild<ElementRef<HTMLDivElement>>('contents');
  toc = signal<any[]>([]);

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const toc: any[] = [];

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

  INSTALL_CODE = `npm install govuk-frontend ngx-govuk --save`;

  BODY_CSS_CODE =
    '<body class="govuk-template__body govuk-frontend-supported">';

  STYLES_CODE = `"styles": [
  "node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css"
]`;

  CSS_ALL_CODE = "@import '../../node_modules/govuk-frontend/dist/govuk/all';";

  CUSTOM_FONT_CODE = `$govuk-font-family: arial, sans-serif;

@import '../../node_modules/govuk-frontend/dist/govuk/all';`;

  CHERRY_PICK_STYLES = `@import "../node_modules/govuk-frontend/dist/govuk/base";
@import "../node_modules/govuk-frontend/dist/govuk/core/all";
@import "../node_modules/govuk-frontend/dist/govuk/objects/all";
@import "../node_modules/govuk-frontend/dist/govuk/components/footer/index";
@import "../node_modules/govuk-frontend/dist/govuk/components/header/index";
@import "../node_modules/govuk-frontend/dist/govuk/utilities/all";
@import "../node_modules/govuk-frontend/dist/govuk/overrides/all";`;

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
