import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ngxGovukButtonGroup]',
  standalone: true,
})
export class NgxGovukButtonGroupDirective {
  @HostBinding('class') get className() {
    return 'govuk-button-group';
  }
}
