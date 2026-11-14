import { Directive } from '@angular/core';

/**
 * Sets a block of content apart from the text around it, such as a quote,
 * an example or extra information.
 *
 * Add it to a `div` element and put the content inside it.
 */
@Directive({
  selector: 'div[ngxGovukInsetText]',
  host: { class: 'govuk-inset-text' },
})
export class NgxGovukInsetText {}
