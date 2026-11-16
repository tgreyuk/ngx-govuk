import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { extractEntryPoint } from './extract-api.mts';

const fixture = join(
  dirname(fileURLToPath(import.meta.url)),
  'fixtures/example/index.ts',
);

const program = ts.createProgram([fixture], {
  strict: true,
  experimentalDecorators: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
});
const api = extractEntryPoint(program, fixture, 'example');
const [component, directive] = api.classes;

test('lists the components and directives, sorted by name', () => {
  assert.equal(api.importPath, 'ngx-govuk/example');
  assert.deepEqual(
    api.classes.map(({ name, kind, selector }) => ({ name, kind, selector })),
    [
      {
        name: 'ExampleComponent',
        kind: 'Component',
        selector: 'app-example',
      },
      {
        name: 'ExampleDirective',
        kind: 'Directive',
        selector: 'a[appExample], button[appExample]',
      },
    ],
  );
});

test('splits the summary into paragraphs, without block tags', () => {
  assert.deepEqual(component.description, [
    'An example component.',
    'Its second paragraph wraps over two lines.',
  ]);
  assert.deepEqual(directive.description, []);
});

test('reads inputs and models, with the type of value they hold', () => {
  assert.deepEqual(component.inputs, [
    {
      name: 'label',
      kind: 'input',
      description: ['A required input.'],
      type: 'string',
      required: true,
    },
    {
      name: 'size',
      kind: 'input',
      description: ['An optional input with no initial value.'],
      type: '"s" | "m"',
      required: false,
    },
    {
      name: 'enabled',
      kind: 'input',
      description: ['An input with an initial value.'],
      type: 'boolean',
      default: 'true',
      required: false,
    },
    {
      name: 'error',
      kind: 'input',
      description: ['An input that can be null.'],
      type: 'string | null',
      required: false,
    },
    {
      name: 'publicName',
      kind: 'input',
      description: ['An input bound under another name.'],
      type: 'number',
      default: '0',
      required: false,
    },
    {
      name: 'compact',
      kind: 'input',
      description: ['An input with a transform.'],
      type: 'boolean',
      default: 'false',
      required: false,
    },
    {
      name: 'checked',
      kind: 'model',
      description: ['A two-way binding.'],
      type: 'boolean',
      default: 'false',
      required: false,
    },
  ]);
});

test("keeps the library's own type names, as written", () => {
  assert.deepEqual(
    directive.inputs.map(({ name, type }) => ({ name, type })),
    [
      { name: 'text', type: 'ExampleText' },
      { name: 'size', type: 'ExampleSize' },
      { name: 'fallbackSize', type: 'ExampleSize | null' },
    ],
  );
  assert.deepEqual(
    directive.outputs.map(({ name, type }) => ({ name, type })),
    [{ name: 'sizeChange', type: 'ExampleSize' }],
  );
});

test('reads outputs', () => {
  assert.deepEqual(component.outputs, [
    {
      name: 'countChange',
      description: ['Emits the new count.'],
      type: 'number',
    },
  ]);
});

test('lists documented public methods, and no other properties', () => {
  assert.equal('properties' in component, false);
  assert.deepEqual(component.methods, [
    {
      name: 'toggle',
      signature: 'toggle(): void',
      description: ['Toggles the example.'],
    },
  ]);
});

test('lists exported interfaces and type aliases, sorted by name', () => {
  assert.deepEqual(api.types, [
    {
      name: 'ExampleLink',
      kind: 'Interface',
      description: ['A link in the example.'],
      properties: [
        {
          name: 'text',
          description: ["The link's text."],
          type: 'string',
          optional: false,
        },
        {
          name: 'href',
          description: ['Where the link goes.'],
          type: 'string',
          optional: true,
        },
        {
          name: 'width',
          description: [],
          type: "'full' | 'one-half'",
          optional: true,
        },
      ],
    },
    {
      name: 'ExampleSection',
      kind: 'Interface',
      description: ["The example's sections, each with its links."],
      properties: [
        {
          name: 'items',
          description: [],
          type: 'ExampleLink[]',
          optional: false,
        },
      ],
    },
    {
      name: 'ExampleSize',
      kind: 'Type',
      description: ['A size: `s` or `m`.'],
      type: "'s' | 'm'",
    },
  ]);
});
