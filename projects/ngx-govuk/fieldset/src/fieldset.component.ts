import { Component, computed, input } from '@angular/core';

/**
 * Groups related form fields under a legend, such as the parts of an address.
 *
 * Put the fields inside it, each in its own `ngx-govuk-form-group`. For radios
 * and checkboxes, use `ngx-govuk-radios` and `ngx-govuk-checkboxes`, which add
 * their own fieldset.
 */
@Component({
  selector: 'ngx-govuk-fieldset',
  templateUrl: './fieldset.component.html',
})
export class NgxGovukFieldset {
  /**
   * The legend, which describes the group of fields.
   */
  legend = input.required<string>();

  /**
   * The legend's size. When unset, the legend is `l` if it's the page heading,
   * and body size otherwise.
   */
  legendSize = input<'s' | 'm' | 'l' | 'xl'>();

  /**
   * Makes the legend the page heading. Use it when the fieldset is the only
   * question on the page.
   */
  asPageHeading = input<boolean>(false);

  protected legendClasses = computed(() => {
    const size = this.legendSize() ?? (this.asPageHeading() ? 'l' : undefined);
    return size
      ? `govuk-fieldset__legend govuk-fieldset__legend--${size}`
      : 'govuk-fieldset__legend';
  });
}
