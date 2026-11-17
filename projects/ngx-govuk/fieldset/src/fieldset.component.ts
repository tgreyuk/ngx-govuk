import { Component, computed, input, booleanAttribute } from '@angular/core';

/**
 * Groups related form inputs under a legend, such as the parts of an address.
 *
 * Put the fields inside it, each in its own `ngx-govuk-form-group`. For radios,
 * checkboxes and dates, use `ngx-govuk-radios`, `ngx-govuk-checkboxes` and
 * `ngx-govuk-date-input`, which add their own fieldset.
 *
 * The `fieldset` is inside the `ngx-govuk-fieldset` element, so classes and
 * attributes you set on `ngx-govuk-fieldset` stay on that element. There are
 * no inputs for GOV.UK's `classes` and `attributes` options.
 */
@Component({
  selector: 'ngx-govuk-fieldset',
  templateUrl: './fieldset.component.html',
  // Custom elements are inline by default; the fieldset inside is a block.
  styles: ':host(:not([hidden])) { display: block; }',
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
  asPageHeading = input(false, { transform: booleanAttribute });

  /**
   * The ids of elements that describe the fieldset, such as a hint, separated
   * by spaces. Sets the fieldset's `aria-describedby`.
   */
  describedBy = input<string>();

  /**
   * The fieldset's ARIA `role`.
   */
  role = input<string>();

  protected legendClasses = computed(() => {
    const size = this.legendSize() ?? (this.asPageHeading() ? 'l' : undefined);
    return size
      ? `govuk-fieldset__legend govuk-fieldset__legend--${size}`
      : 'govuk-fieldset__legend';
  });
}
