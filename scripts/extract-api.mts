/**
 * Writes the API reference for each library entry point to
 * `projects/website/src/assets/api/<entry-point>.json`, for the docs site's
 * component pages.
 *
 * Reads the library source with the TypeScript compiler API: the selector
 * comes from the `@Component` / `@Directive` decorator, and inputs, models and
 * outputs from their `input()`, `model()` and `output()` initialisers. Public
 * methods are listed only when they have a JSDoc comment. Other properties are
 * left out: they are a component's state, not its API. Exported interfaces and
 * type aliases are listed too, with their types as written. Anything tagged
 * `@internal` is left out.
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
  ApiProperty,
  ApiType,
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

/**
 * The components, directives, interfaces and type aliases exported from one
 * entry point's index file.
 */
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
  const types: ApiType[] = [];
  for (const exported of exports) {
    const symbol =
      exported.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exported)
        : exported;
    for (const declaration of symbol.declarations ?? []) {
      if (ts.isClassDeclaration(declaration)) {
        const apiClass = extractClass(checker, declaration);
        if (apiClass) {
          classes.push(apiClass);
        }
      } else if (
        ts.isInterfaceDeclaration(declaration) ||
        ts.isTypeAliasDeclaration(declaration)
      ) {
        if (!isInternal(declaration)) {
          types.push(extractType(declaration));
        }
      }
    }
  }
  classes.sort((a, b) => a.name.localeCompare(b.name));
  types.sort((a, b) => a.name.localeCompare(b.name));

  return { name, importPath: `ngx-govuk/${name}`, classes, types };
}

/**
 * An interface with its properties, or a type alias with its definition.
 * Types are as written in the source, such as `NgxGovukFooterLink[]`, rather
 * than expanded, so they name the library's other types.
 */
function extractType(
  declaration: ts.InterfaceDeclaration | ts.TypeAliasDeclaration,
): ApiType {
  const apiType: ApiType = {
    name: declaration.name.text,
    kind: ts.isInterfaceDeclaration(declaration) ? 'Interface' : 'Type',
    description: description(declaration),
  };
  if (ts.isTypeAliasDeclaration(declaration)) {
    apiType.type = typeText(declaration.type);
    return apiType;
  }
  apiType.properties = [];
  for (const member of declaration.members) {
    if (isInternal(member) || !member.name || !ts.isIdentifier(member.name)) {
      continue;
    }
    let type = 'unknown';
    if (ts.isPropertySignature(member) && member.type) {
      type = typeText(member.type);
    } else if (ts.isMethodSignature(member)) {
      const parameters = member.parameters.map((p) => p.getText()).join(', ');
      type = `(${parameters}) => ${member.type ? typeText(member.type) : 'void'}`;
    }
    const property: ApiProperty = {
      name: member.name.text,
      description: description(member),
      type,
      optional: !!member.questionToken,
    };
    apiType.properties.push(property);
  }
  return apiType;
}

/**
 * A type node's source text on one line, without the leading `|` that
 * Prettier adds to a union wrapped over several lines.
 */
function typeText(node: ts.TypeNode): string {
  return node
    .getText()
    .replace(/\s*\n\s*/g, ' ')
    .replace(/^\|\s*/, '');
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
  const signalType = checker.getTypeAtLocation(name);
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
      kind: fn,
      description: description(member),
      // An optional input's `undefined` is left out: not being required
      // already says it can be left unset.
      type:
        writtenType(checker, call, { omitUndefined: !required }) ??
        valueType(checker, signalType, { omitUndefined: !required }),
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
      type: writtenType(checker, call) ?? valueType(checker, signalType),
    };
    apiClass.outputs.push(output);
  }
}

/**
 * The type of value an input, model or output holds, such as `string` for
 * `InputSignal<string>`, rather than the signal's own type. For an input with
 * a transform, such as `booleanAttribute`, this is the type after the
 * transform, `boolean`, not the `unknown` it accepts.
 */
function valueType(
  checker: ts.TypeChecker,
  signalType: ts.Type,
  { omitUndefined = false } = {},
): string {
  const [value] =
    signalType.aliasTypeArguments ??
    (isTypeReference(signalType) ? checker.getTypeArguments(signalType) : []);
  if (!value) {
    return checker.typeToString(signalType, undefined, TYPE_FORMAT);
  }
  if (omitUndefined && value.isUnion()) {
    // TypeScript puts `null` first; write it last, as in `string | null`.
    const isNull = (member: ts.Type) => !!(member.flags & ts.TypeFlags.Null);
    const defined = value.types
      .filter((member) => !(member.flags & ts.TypeFlags.Undefined))
      .sort((a, b) => Number(isNull(a)) - Number(isNull(b)));
    // `boolean` is the union `true | false`: keep it as one word.
    if (defined.length !== value.types.length) {
      return defined
        .map((member) => checker.typeToString(member, undefined, TYPE_FORMAT))
        .join(' | ')
        .replace(/\bfalse \| true\b|\btrue \| false\b/, 'boolean');
    }
  }
  return checker.typeToString(value, undefined, TYPE_FORMAT);
}

/**
 * The value's type from the type argument written in the call, as in
 * `input<NgxGovukPluralText>()`, or undefined when there isn't one and the
 * type is inferred.
 *
 * TypeScript loses some of the library's type names: it expands an alias of
 * another generic type, such as `NgxGovukPluralText`, an alias of `Partial`,
 * and flattens a union alias, such as `NgxGovukInputWidth`, when it adds
 * `undefined`. So a type that names another type, such as
 * `NgxGovukFooterLink[]`, is kept as written. Other types, such as
 * `'s' | 'm'`, come from the checker, so they're written as everywhere
 * else, as in `"s" | "m"`.
 */
function writtenType(
  checker: ts.TypeChecker,
  call: ts.CallExpression,
  { omitUndefined = false } = {},
): string | undefined {
  const [node] = call.typeArguments ?? [];
  if (!node) {
    return undefined;
  }
  const isKeyword = (member: ts.TypeNode, kind: ts.SyntaxKind) =>
    member.kind === kind ||
    (ts.isLiteralTypeNode(member) && member.literal.kind === kind);
  const members = (ts.isUnionTypeNode(node) ? [...node.types] : [node])
    .filter(
      (member) =>
        !(omitUndefined && isKeyword(member, ts.SyntaxKind.UndefinedKeyword)),
    )
    // `null` last, as in `string | null`.
    .sort(
      (a, b) =>
        Number(isKeyword(a, ts.SyntaxKind.NullKeyword)) -
        Number(isKeyword(b, ts.SyntaxKind.NullKeyword)),
    );
  return members
    .map((member) =>
      namesAType(member)
        ? typeText(member)
        : checker.typeToString(
            checker.getTypeFromTypeNode(member),
            undefined,
            TYPE_FORMAT,
          ),
    )
    .join(' | ');
}

/** Whether a type node refers to a type by name, such as `UrlTree`. */
function namesAType(node: ts.Node): boolean {
  return ts.isTypeReferenceNode(node) || !!ts.forEachChild(node, namesAType);
}

function isTypeReference(type: ts.Type): type is ts.TypeReference {
  return (
    !!(type.flags & ts.TypeFlags.Object) &&
    !!((type as ts.ObjectType).objectFlags & ts.ObjectFlags.Reference)
  );
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
