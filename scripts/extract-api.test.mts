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

test('reads inputs and models, with their full types', () => {
  assert.deepEqual(component.inputs, [
    {
      name: 'label',
      description: ['A required input.'],
      type: 'InputSignal<string>',
      required: true,
    },
    {
      name: 'size',
      description: ['An optional input with no initial value.'],
      type: 'InputSignal<"s" | "m" | undefined>',
      required: false,
    },
    {
      name: 'enabled',
      description: ['An input with an initial value.'],
      type: 'InputSignal<boolean>',
      default: 'true',
      required: false,
    },
    {
      name: 'error',
      description: ['An input that can be null.'],
      type: 'InputSignal<string | null | undefined>',
      required: false,
    },
    {
      name: 'publicName',
      description: ['An input bound under another name.'],
      type: 'InputSignal<number>',
      default: '0',
      required: false,
    },
    {
      name: 'checked',
      description: ['A two-way binding.'],
      type: 'ModelSignal<boolean>',
      default: 'false',
      required: false,
    },
  ]);
});

test('reads outputs', () => {
  assert.deepEqual(component.outputs, [
    {
      name: 'countChange',
      description: ['Emits the new count.'],
      type: 'OutputEmitterRef<number>',
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
