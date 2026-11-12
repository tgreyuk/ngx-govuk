import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'importCode',
  standalone: true,
})
export class ImportCodePipe implements PipeTransform {
  transform(componentName: string, entrypoint: string) {
    return `import { ${componentName} } from 'ngx-govuk/${entrypoint}';`;
  }
}
