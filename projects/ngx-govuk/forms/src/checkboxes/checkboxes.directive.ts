import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ngxGovukCheckboxes]',
  standalone: true,
})
export class NgxGovukCheckboxesDirective {
  @HostBinding('class') get className() {
    return 'govuk-checkboxes';
  }
}
