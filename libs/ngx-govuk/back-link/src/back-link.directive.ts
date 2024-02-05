import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'a[ngxGovukBackLink]',
  standalone: true,
})
export class NgxGovukBackLinkDirective {
  @HostBinding('class') get className() {
    return `govuk-back-link`;
  }
}
