import { NgTemplateOutlet } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { CodeBlockComponent } from '../component-code/code-block.component';
import { ApiClass, ApiEntryPoint } from './api-docs';

/**
 * A description paragraph as HTML: the text escaped, and `backticked` parts
 * wrapped in code, as JSDoc writes them.
 */
type Paragraph = string;

/**
 * One entry of a section: a member's name and type, or a method's name and
 * call signature, such as `(): void`.
 */
interface ApiEntry {
  name: string;
  type: string;
  description: Paragraph[];
  default?: string;
  required?: boolean;
}

interface ApiSection {
  title: string;
  entries: ApiEntry[];
}

/**
 * The API reference for one library entry point, from
 * `assets/api/<componentId>.json` (written by `npm run website:api`).
 */
@Component({
  selector: 'ngx-govuk-api',
  imports: [CodeBlockComponent, NgTemplateOutlet],
  templateUrl: './component-api.component.html',
})
export class ComponentApiComponent {
  componentId = input<string>('');

  /**
   * The level for each class's heading: 2 on the API tab, right under the
   * page's `h1`, and 3 in a guide, under its own "API" `h2`.
   */
  headingLevel = input<2 | 3>(3);

  // Reloads when componentId changes: the router reuses the page when moving
  // from one component to another.
  private api = httpResource<ApiEntryPoint>(() =>
    this.componentId() ? `./assets/api/${this.componentId()}.json` : undefined,
  );

  /** Each class with its inputs, outputs and methods as lists. */
  classes = computed(() =>
    this.api.hasValue()
      ? this.api.value().classes.map((apiClass) => ({
          ...apiClass,
          description: paragraphs(apiClass.description),
          sections: sections(apiClass),
        }))
      : [],
  );

  /**
   * One import for everything in this entry point, to paste alongside the
   * example's template. Wrapped one name per line when too long for one line,
   * as Prettier would.
   */
  importCode = computed(() => {
    if (!this.api.hasValue()) {
      return undefined;
    }
    const { classes, importPath } = this.api.value();
    const names = classes.map((apiClass) => apiClass.name);
    if (!names.length) {
      return undefined;
    }
    const from = `from '${importPath}';`;
    const oneLine = `import { ${names.join(', ')} } ${from}`;
    return oneLine.length <= 80
      ? oneLine
      : `import {\n${names.map((name) => `  ${name},`).join('\n')}\n} ${from}`;
  });
}

function sections(apiClass: ApiClass): ApiSection[] {
  return [
    {
      title: 'Inputs',
      // An optional input with no initial value starts as undefined; a
      // required one has no default.
      entries: apiClass.inputs.map((input) => ({
        ...input,
        description: paragraphs(input.description),
        default: input.default ?? (input.required ? undefined : 'undefined'),
      })),
    },
    {
      title: 'Outputs',
      entries: apiClass.outputs.map((output) => ({
        ...output,
        description: paragraphs(output.description),
      })),
    },
    {
      title: 'Methods',
      entries: apiClass.methods.map((method) => ({
        ...method,
        description: paragraphs(method.description),
        type: method.signature.slice(method.name.length),
      })),
    },
  ];
}

/**
 * Turns each paragraph into HTML, with `backticked` parts as code. Built here
 * rather than in the template so that no whitespace creeps in around the code,
 * as before a full stop.
 */
function paragraphs(description: string[]): Paragraph[] {
  return description.map((paragraph) =>
    paragraph
      .split('`')
      .map((text, index) =>
        index % 2 === 1
          ? `<code class="app-api-code">${escapeHtml(text)}</code>`
          : escapeHtml(text),
      )
      .join(''),
  );
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
