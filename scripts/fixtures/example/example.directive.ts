import { Directive, input, output } from '@angular/core';
import type { ExampleSize, ExampleText } from './example.types';

@Directive({
  selector: 'a[appExample], button[appExample]',
})
export class ExampleDirective {
  /** An alias of another generic type. */
  text = input<ExampleText>({ other: '' });

  /** A union alias, optional, so TypeScript adds `undefined`. */
  size = input<ExampleSize>();

  /** A union alias that can be null, written with `null` first. */
  fallbackSize = input<null | ExampleSize>(null);

  /** Emits the chosen size. */
  sizeChange = output<ExampleSize>();
}
