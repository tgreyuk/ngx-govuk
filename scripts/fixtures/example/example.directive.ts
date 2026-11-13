import { Directive } from '@angular/core';

@Directive({
  selector: 'a[appExample], button[appExample]',
})
export class ExampleDirective {}
