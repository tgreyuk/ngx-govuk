import { Directive, HostBinding, Input } from '@angular/core';
import { InputWidth } from '../models';

@Directive({
  selector: 'input[ngxGovukTextInput]',
  standalone: true,
})
export class NgxGovukTextInputDirective {
  @HostBinding('class') get className() {
    const classMap: Record<InputWidth, string> = {
      '2': 'govuk-input--width-2',
      '3': 'govuk-input--width-3',
      '4': 'govuk-input--width-4',
      '5': 'govuk-input--width-5',
      '10': 'govuk-input--width-10',
      '20': 'govuk-input--width-20',
      full: 'govuk-!-width-full',
    };
    return `govuk-input ${classMap[this.width]}`;
  }

  @Input() width: InputWidth = 'full';
}
