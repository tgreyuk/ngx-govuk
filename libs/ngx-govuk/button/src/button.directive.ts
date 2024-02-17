import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: 'a[ngxGovukButton],button[ngxGovukButton]',
  standalone: true,
})
export class NgxGovukButtonDirective {
  @HostBinding('class') get className() {
    const classes = ['govuk-button'];
    if (this.type() === 'secondary') {
      classes.push('govuk-button--secondary');
    }
    if (this.type() === 'warning') {
      classes.push('govuk-button--warning');
    }
    return classes.join(' ');
  }
  type = input<'default' | 'secondary' | 'warning'>('default');
}
