import { NgTemplateOutlet } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../component-code/code-block.component';
import { ApiClass, ApiEntryPoint, ApiType } from './api-docs';

/**
 * A description paragraph as HTML: the text escaped, and `backticked` parts
 * wrapped in code, as JSDoc writes them.
 */
type Paragraph = string;

/**
 * A type or signature cut into parts, so the names of the entry point's own
 * interfaces and type aliases can link to them. `link` is the id of the
 * type's heading.
 */
type TypeParts = { text: string; link?: string }[];

/**
 * One entry of a section: a member's name and type, or a method's name and
 * call signature, such as `(): void`.
 */
interface ApiEntry {
  name: string;
  type: TypeParts;
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
  imports: [CodeBlockComponent, NgTemplateOutlet, RouterLink],
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

  /** The names of the entry point's interfaces and type aliases. */
  private typeNames = computed(
    () =>
      new Set(
        this.api.hasValue() ? this.api.value().types.map((t) => t.name) : [],
      ),
  );

  /** Each class with its inputs, outputs and methods as lists. */
  protected classes = computed(() => {
    if (!this.api.hasValue()) {
      return [];
    }
    const names = this.typeNames();
    return this.api.value().classes.map((apiClass) => ({
      ...apiClass,
      description: paragraphs(apiClass.description),
      sections: sections(apiClass, names),
    }));
  });

  /**
   * Each interface with its properties, and each type alias with its
   * definition.
   */
  protected types = computed(() => {
    if (!this.api.hasValue()) {
      return [];
    }
    const names = this.typeNames();
    return this.api
      .value()
      .types.map((apiType) => typeWithParts(apiType, names));
  });

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

/**
 * Inputs, outputs and methods as lists. Inputs and outputs are named as they
 * are bound, as in `[heading]`, `[(expanded)]` and `(closed)`, so a model
 * stands out from an input.
 */
function sections(apiClass: ApiClass, typeNames: Set<string>): ApiSection[] {
  return [
    {
      title: 'Inputs',
      // An optional input with no initial value starts as undefined; a
      // required one has no default.
      entries: apiClass.inputs.map((input) => ({
        ...input,
        name: input.kind === 'model' ? `[(${input.name})]` : `[${input.name}]`,
        type: typeParts(input.type, typeNames),
        description: paragraphs(input.description),
        default: input.default ?? (input.required ? undefined : 'undefined'),
      })),
    },
    {
      title: 'Outputs',
      entries: apiClass.outputs.map((output) => ({
        ...output,
        name: `(${output.name})`,
        type: typeParts(output.type, typeNames),
        description: paragraphs(output.description),
      })),
    },
    {
      title: 'Methods',
      entries: apiClass.methods.map((method) => ({
        ...method,
        description: paragraphs(method.description),
        type: typeParts(method.signature.slice(method.name.length), typeNames),
      })),
    },
  ];
}

/** An interface's properties as entries, required unless optional. */
function typeWithParts(apiType: ApiType, typeNames: Set<string>) {
  return {
    name: apiType.name,
    kind: apiType.kind,
    description: paragraphs(apiType.description),
    type:
      apiType.type === undefined
        ? undefined
        : typeParts(apiType.type, typeNames),
    properties: (apiType.properties ?? []).map((property): ApiEntry => ({
      name: property.name,
      type: typeParts(property.type, typeNames),
      description: paragraphs(property.description),
      required: !property.optional,
    })),
  };
}

/**
 * Cuts a type into parts, with the entry point's own type names, such as
 * `NgxGovukFooterLink` in `InputSignal<NgxGovukFooterLink[]>`, as links.
 */
export function typeParts(type: string, typeNames: Set<string>): TypeParts {
  const parts: TypeParts = [];
  // Odd indexes are identifiers, as the split keeps what it splits on.
  type.split(/([A-Za-z_$][\w$]*)/).forEach((text, index) => {
    const last = parts.at(-1);
    if (index % 2 === 1 && typeNames.has(text)) {
      parts.push({ text, link: text });
    } else if (last && !last.link) {
      last.text += text;
    } else if (text) {
      parts.push({ text });
    }
  });
  return parts;
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
