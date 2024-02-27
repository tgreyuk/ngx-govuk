import {
  Directive,
  ElementRef,
  HostBinding,
  Optional,
  Self,
  input,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputWidth } from 'ngx-govuk';

/**
 * Directive to be added to native input elements.
 *
 * @selector input[ngxGovukTextInput]
 *
 */
@Directive({
  selector: 'input[ngxGovukTextInput]',
  standalone: true,
})
export class NgxGovukTextInput {
  @HostBinding('class') get className() {
    const classes = ['govuk-input'];
    if (this.inputWidth()) {
      const widthClassMap: Record<InputWidth, string> = {
        ['2']: 'govuk-input--width-2',
        ['3']: 'govuk-input--width-3',
        ['4']: 'govuk-input--width-4',
        ['5']: 'govuk-input--width-5',
        ['10']: 'govuk-input--width-10',
        ['20']: 'govuk-input--width-20',
        ['full']: 'govuk-!-width-full',
        ['three-quarters']: 'govuk-!-width-three-quarters',
        ['two-thirds']: 'govuk-!-width-two-thirds',
        ['one-half']: 'govuk-!-width-one-half',
        ['one-third']: 'govuk-!-width-one-third',
        ['one-quarter']: 'govuk-!-width-one-quarter',
      };
      classes.push(widthClassMap[this.inputWidth() || 'full']);
    }
    return classes.join(' ');
  }

  @HostBinding('class.govuk-input--error') get isInvalidClass() {
    return this.control?.status === 'INVALID';
  }

  /**
   * The width of the input. Accepts any GOV.UK fixed or fluid width units.
   */
  inputWidth = input<
    | 'full'
    | 'three-quarters'
    | 'two-thirds'
    | 'one-half'
    | 'one-third'
    | 'one-quarter'
    | '2'
    | '3'
    | '4'
    | '5'
    | '10'
    | '20'
  >();

  constructor(
    @Optional() @Self() public control: NgControl,
    public elementRef: ElementRef,
  ) {}
}
