import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startcase',
  standalone: true,
})
export class StartCasePipe implements PipeTransform {
  transform(str?: string) {
    const result = str?.replace(/([A-Z])|-/g, ' $1').trim();
    return result ? result?.charAt(0).toUpperCase() + result.slice(1) : '';
  }
}
