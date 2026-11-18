/**
 * The shape of `assets/api/<entry-point>.json`, written at build time by
 * `scripts/extract-api.ts` from the library source and read by
 * `ComponentApiComponent`.
 *
 * Descriptions are the JSDoc summary split into paragraphs.
 */
export interface ApiEntryPoint {
  /** The entry point's folder name, such as `button`. */
  name: string;
  /** The import path, such as `ngx-govuk/button`. */
  importPath: string;
  /** The exported components and directives, sorted by name. */
  classes: ApiClass[];
  /**
   * The exported interfaces and type aliases, sorted by name: the shapes of
   * values that inputs and models take, such as a footer's links.
   */
  types: ApiType[];
}

export interface ApiClass {
  name: string;
  kind: 'Component' | 'Directive';
  selector: string;
  description: string[];
  /** Inputs and models, in source order. */
  inputs: ApiInput[];
  outputs: ApiOutput[];
  methods: ApiMethod[];
}

/**
 * An `input()` or `model()`. The type is the value it holds, such as
 * `boolean` for `ModelSignal<boolean>`, without `undefined` when the input is
 * optional.
 */
export interface ApiInput {
  name: string;
  /** A `model` can also be bound both ways, with `[(name)]`. */
  kind: 'input' | 'model';
  description: string[];
  type: string;
  /** The initial value as written in the source, if there is one. */
  default?: string;
  required: boolean;
}

/** An `output()`. The type is the value it emits, such as `number`. */
export interface ApiOutput {
  name: string;
  description: string[];
  type: string;
}

export interface ApiMethod {
  name: string;
  /** The name and call signature, such as `toggle(): void`. */
  signature: string;
  description: string[];
}

/**
 * An exported interface, with its properties, or type alias, with its
 * definition.
 */
export interface ApiType {
  name: string;
  kind: 'Interface' | 'Type';
  description: string[];
  /** A type alias's definition as written, such as `'s' | 'm'`. */
  type?: string;
  /** An interface's properties, in source order. */
  properties?: ApiProperty[];
}

/** A property of an interface. Its type is as written in the source. */
export interface ApiProperty {
  name: string;
  description: string[];
  type: string;
  optional: boolean;
}
