/**
 * Writes the API reference for each library entry point to
 * `projects/website/src/assets/api/<entry-point>.json`, for the docs site's
 * component pages.
 *
 * Reads the library source with the TypeScript compiler API: the selector
 * comes from the `@Component` / `@Directive` decorator, and inputs, models and
 * outputs from their `input()`, `model()` and `output()` initialisers. Public
 * methods are listed only when they have a JSDoc comment. Other properties are
 * left out: they are a component's state, not its API. So is anything tagged
 * `@internal`.
 *
 * Run with `npm run website:api`; Node strips the types.
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import type {
  ApiClass,
  ApiEntryPoint,
  ApiInput,
  ApiOutput,
  ApiMethod,
} from '../projects/website/src/app/routes/components/component-api/api-docs.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const libraryDir = join(root, 'projects/ngx-govuk');
const outDir = join(root, 'projects/website/src/assets/api');

const TYPE_FORMAT =
  ts.TypeFormatFlags.NoTruncation |
  ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;

/** Creates a program from a tsconfig file, such as the library's. */
export function createProgram(tsconfigPath: string): ts.Program {
  const config = ts.getParsedCommandLineOfConfigFile(
    tsconfigPath,
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
        throw new Error(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
        );
      },
    },
  );
  if (!config) {
    throw new Error(`Could not read ${tsconfigPath}`);
  }
  return ts.createProgram(config.fileNames, config.options);
}

/** The components and directives exported from one entry point's index file. */
export function extractEntryPoint(
  program: ts.Program,
  indexFile: string,
  name: string,
): ApiEntryPoint {
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(indexFile);
  if (!sourceFile) {
    throw new Error(`${indexFile} is not part of the program`);
  }
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  const exports = moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : [];

  const classes: ApiClass[] = [];
  for (const exported of exports) {
    const symbol =
      exported.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exported)
        : exported;
    const declaration = symbol.declarations?.find(ts.isClassDeclaration);
    if (declaration) {
      const apiClass = extractClass(checker, declaration);
      if (apiClass) {
        classes.push(apiClass);
      }
    }
  }
  classes.sort((a, b) => a.name.localeCompare(b.name));

  return { name, importPath: `ngx-govuk/${name}`, classes };
}

function extractClass(
  checker: ts.TypeChecker,
  declaration: ts.ClassDeclaration,
): ApiClass | undefined {
  const decorator = angularDecorator(declaration);
  if (!decorator || !declaration.name || isInternal(declaration)) {
    return undefined;
  }

  const apiClass: ApiClass = {
    name: declaration.name.text,
    kind: decorator.kind,
    selector: decorator.selector,
    description: description(declaration),
    inputs: [],
    outputs: [],
    methods: [],
  };

  for (const member of declaration.members) {
    if (
      !isPublic(member) ||
      isInternal(member) ||
      !member.name ||
      !ts.isIdentifier(member.name)
    ) {
      continue;
    }
    if (ts.isPropertyDeclaration(member)) {
      addInputOrOutput(checker, apiClass, member, member.name);
    } else if (ts.isMethodDeclaration(member)) {
      const signature = checker.getSignatureFromDeclaration(member);
      const method: ApiMethod = {
        name: member.name.text,
        signature:
          member.name.text +
          (signature
            ? checker.signatureToString(signature, undefined, TYPE_FORMAT)
            : '()'),
        description: description(member),
      };
      if (method.description.length) {
        apiClass.methods.push(method);
      }
    }
  }

  return apiClass;
}

/** Adds the property to the inputs or outputs if it is one; otherwise skips it. */
function addInputOrOutput(
  checker: ts.TypeChecker,
  apiClass: ApiClass,
  member: ts.PropertyDeclaration,
  name: ts.Identifier,
) {
  // The declared type in full, such as `InputSignal<string | undefined>` or
  // `ModelSignal<boolean>`: it tells Angular developers how to use the member.
  const type = checker.typeToString(
    checker.getTypeAtLocation(name),
    undefined,
    TYPE_FORMAT,
  );
  const initializer = member.initializer;
  const call =
    initializer && ts.isCallExpression(initializer) ? initializer : undefined;
  const fn = call && signalFunction(call.expression);

  if (call && (fn === 'input' || fn === 'model')) {
    const required = call.expression.getText().endsWith('.required');
    // input(initialValue, options) / input.required(options)
    const initialValue = required ? undefined : call.arguments[0];
    const options = required ? call.arguments[0] : call.arguments[1];
    const input: ApiInput = {
      name: alias(options) ?? name.text,
      description: description(member),
      type,
      default: initialValue?.getText(),
      required,
    };
    if (input.default === undefined) {
      delete input.default;
    }
    apiClass.inputs.push(input);
    return;
  }

  if (call && fn === 'output') {
    const output: ApiOutput = {
      name: alias(call.arguments[0]) ?? name.text,
      description: description(member),
      type,
    };
    apiClass.outputs.push(output);
  }
}

/** `input`, `model` or `output` when called as `input(...)`, `input.required(...)`, etc. */
function signalFunction(expression: ts.Expression): string | undefined {
  if (ts.isIdentifier(expression)) {
    return expression.text;
  }
  if (
    ts.isPropertyAccessExpression(expression) &&
    ts.isIdentifier(expression.expression) &&
    expression.name.text === 'required'
  ) {
    return expression.expression.text;
  }
  return undefined;
}

/** The `alias` option of `input()`, `model()` or `output()`, if set. */
function alias(options: ts.Expression | undefined): string | undefined {
  if (!options || !ts.isObjectLiteralExpression(options)) {
    return undefined;
  }
  for (const property of options.properties) {
    if (
      ts.isPropertyAssignment(property) &&
      ts.isIdentifier(property.name) &&
      property.name.text === 'alias' &&
      ts.isStringLiteralLike(property.initializer)
    ) {
      return property.initializer.text;
    }
  }
  return undefined;
}

function angularDecorator(
  declaration: ts.ClassDeclaration,
): { kind: ApiClass['kind']; selector: string } | undefined {
  for (const decorator of ts.getDecorators(declaration) ?? []) {
    const call = decorator.expression;
    if (!ts.isCallExpression(call) || !ts.isIdentifier(call.expression)) {
      continue;
    }
    const kind = call.expression.text;
    if (kind !== 'Component' && kind !== 'Directive') {
      continue;
    }
    const [metadata] = call.arguments;
    let selector = '';
    if (metadata && ts.isObjectLiteralExpression(metadata)) {
      for (const property of metadata.properties) {
        if (
          ts.isPropertyAssignment(property) &&
          ts.isIdentifier(property.name) &&
          property.name.text === 'selector' &&
          ts.isStringLiteralLike(property.initializer)
        ) {
          selector = property.initializer.text;
        }
      }
    }
    return { kind, selector };
  }
  return undefined;
}

/**
 * Marked `@internal`: public only so the library's own components can use it,
 * such as a field's `hasError`, which the form group sets.
 */
function isInternal(declaration: ts.Node): boolean {
  return ts
    .getJSDocTags(declaration)
    .some((tag) => tag.tagName.text === 'internal');
}

function isPublic(member: ts.ClassElement): boolean {
  if (member.name && ts.isPrivateIdentifier(member.name)) {
    return false;
  }
  const flags = ts.getCombinedModifierFlags(member as ts.Declaration);
  return !(
    flags &
    (ts.ModifierFlags.Private |
      ts.ModifierFlags.Protected |
      ts.ModifierFlags.Static)
  );
}

/**
 * The declaration's own JSDoc summary (block tags left out), split into
 * paragraphs. Comments inherited from an interface, such as Angular's
 * lifecycle hooks, are not used.
 */
function description(declaration: ts.Node): string[] {
  const docs = ts.getJSDocCommentsAndTags(declaration).filter(ts.isJSDoc);
  return docs
    .map((doc) => ts.getTextOfJSDocComment(doc.comment) ?? '')
    .join('\n\n')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

/** The library's secondary entry points, such as `button`. */
export function entryPoints(): { name: string; indexFile: string }[] {
  return readdirSync(libraryDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      indexFile: join(libraryDir, entry.name, 'src/index.ts'),
    }))
    .filter(
      ({ name, indexFile }) =>
        existsSync(join(libraryDir, name, 'ng-package.json')) &&
        existsSync(indexFile),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}

function main() {
  const program = createProgram(join(libraryDir, 'tsconfig.lib.json'));
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  for (const { name, indexFile } of entryPoints()) {
    const api = extractEntryPoint(program, indexFile, name);
    writeFileSync(
      join(outDir, `${name}.json`),
      `${JSON.stringify(api, null, 2)}\n`,
    );
  }
  console.log(`Wrote the API reference to ${outDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
