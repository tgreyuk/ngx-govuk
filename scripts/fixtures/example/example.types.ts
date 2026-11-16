/** A link in the example. */
export interface ExampleLink {
  /** The link's text. */
  text: string;
  /** Where the link goes. */
  href?: string;
  /**
   * Set by another component in the library.
   *
   * @internal
   */
  index?: number;
  // prettier-ignore
  width?:
    | 'full'
    | 'one-half';
}

/** The example's sections, each with its links. */
export interface ExampleSection {
  items: ExampleLink[];
}

/** A size: `s` or `m`. */
export type ExampleSize = 's' | 'm';

/** @internal */
export interface ExampleInternal {
  value: string;
}

// Not exported from the index file, so left out.
export interface ExampleUnexported {
  value: string;
}
