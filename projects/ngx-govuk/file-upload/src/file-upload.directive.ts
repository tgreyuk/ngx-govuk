import {
  Directive,
  ElementRef,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { NGX_GOVUK_FIELD, NgxGovukField } from 'ngx-govuk';

/**
 * Styles an `input type="file"` as a GOV.UK file upload, to help users
 * select and upload a file.
 *
 * Put it inside `ngx-govuk-form-group`, which adds its label, hint and error
 * message. Add `multiple` to let users select more than one file.
 *
 * Angular's form controls only see the file's name, not the file. To read
 * the file, use the input's `files` in its `change` event.
 */
@Directive({
  selector: 'input[type=file][ngxGovukFileUpload]',
  host: {
    class: 'govuk-file-upload',
    '[class.govuk-file-upload--error]': 'hasError()',
  },
  providers: [
    {
      provide: NGX_GOVUK_FIELD,
      useExisting: forwardRef(() => NgxGovukFileUpload),
    },
  ],
})
export class NgxGovukFileUpload implements NgxGovukField {
  /** @internal */
  elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /**
   * Set by `ngx-govuk-form-group` when it has an error message.
   *
   * @internal
   */
  hasError = signal(false);
}
