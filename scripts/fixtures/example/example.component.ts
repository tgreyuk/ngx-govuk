import { Component, input, model, output, signal } from '@angular/core';

/**
 * An example component.
 *
 * Its second paragraph
 * wraps over two lines.
 *
 * @deprecated Block tags are left out of the description.
 */
@Component({
  selector: 'app-example',
  template: '',
})
export class ExampleComponent {
  /** A required input. */
  label = input.required<string>();

  /** An optional input with no initial value. */
  size = input<'s' | 'm'>();

  /** An input with an initial value. */
  enabled = input(true);

  /** An input that can be null. */
  error = input<string | null>();

  /** An input bound under another name. */
  internalName = input(0, { alias: 'publicName' });

  /** A two-way binding. */
  checked = model(false);

  /** Emits the new count. */
  countChange = output<number>();

  /** Documented, but a property rather than an input, so left out. */
  open = signal(false);

  // Undocumented members are left out.
  undocumented = signal('');

  protected hidden = input<string>();

  /** Private members are left out, even when documented. */
  private secret = signal(1);

  /** Toggles the example. */
  toggle() {
    this.open.set(!this.open());
  }

  /**
   * Called by another component in the library.
   *
   * @internal
   */
  reset() {
    this.open.set(false);
  }

  helper() {
    return this.secret();
  }
}
