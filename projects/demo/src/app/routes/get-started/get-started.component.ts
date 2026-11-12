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

interface TocEntry {
  heading: string | null;
  id: string;
  subheadings?: TocEntry[];
}

@Component({
  selector: 'ngx-govuk-get-started',
  standalone: true,
  imports: [],
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

  INSTALL_CODE = `npm install govuk-frontend ngx-govuk --save`;

  BODY_CSS_CODE =
    '<body class="govuk-template__body govuk-frontend-supported">';

  STYLES_CODE = `"styles": [
  "node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css"
]`;

  CUSTOM_FONT_CODE = `@use 'govuk-frontend' with (
  $govuk-font-family: (arial, sans-serif)
);`;

  CHERRY_PICK_STYLES = `@use 'govuk-frontend/dist/govuk/base';
@use 'govuk-frontend/dist/govuk/core';
@use 'govuk-frontend/dist/govuk/objects';
@use 'govuk-frontend/dist/govuk/components/footer';
@use 'govuk-frontend/dist/govuk/components/header';
@use 'govuk-frontend/dist/govuk/utilities';
@use 'govuk-frontend/dist/govuk/overrides';`;

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
