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
 * An `input()` or `model()`. Types are the declared type in full, such as
 * `ModelSignal<boolean>`, which tells a model apart from an input.
 */
export interface ApiInput {
  name: string;
  description: string[];
  type: string;
  /** The initial value as written in the source, if there is one. */
  default?: string;
  required: boolean;
}

/** An `output()`, such as `OutputEmitterRef<number>`. */
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
