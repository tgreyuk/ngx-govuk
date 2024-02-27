import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  computed,
  contentChild,
  effect,
  input,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukTextInput } from '../text-input/text-input.directive';

/**
 * A commom wrapper around form controls and directives.
 *
 * The content slot expects a single form component / directive with an optional associated form control.
 *
 * Valid content children are NgxGovukTextInput.
 *
 * @selector ngx-govuk-form-group
 *
 */

@Component({
  selector: 'ngx-govuk-form-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukFormGroup implements AfterViewInit {
  /**
   * The label text for the form group.
   *
   * @required
   */
  label = input.required<string>();

  /**
   * If you're asking just one question, you can set the contents of the <label> as the page heading.
   *
   * @initialValue false
   */
  asPageHeading = input<boolean>(false);

  /**
   * Hint text that can provide help information.
   */
  hint = input<string>();

  /**
   * Prefix to add before the field.
   */
  prefix = input<string>();

  /**
   * Prefix to add before the field.
   */
  suffix = input<string>();

  /**
   * Error message to display when the form contrrol is invalid.
   */
  errorMessage = input<string>();

  isInvalid = signal<boolean>(false);
  control = contentChild(NgControl);
  fieldEl = contentChild(NgxGovukTextInput);

  ariaDescribedBy = computed(() => {
    const describedbyIds = [];
    if (this.hint()) {
      describedbyIds.push(this.hintId);
    }
    if (this.isInvalid()) {
      describedbyIds.push(this.errorId);
    }
    return describedbyIds.join(' ');
  });

  fieldId = this.utilsService.randomId('field');
  hintId = this.utilsService.randomId('hint');
  errorId = this.utilsService.randomId('error');

  constructor(
    private renderer: Renderer2,
    private utilsService: NgxGovukUtilsService,
  ) {
    effect(() => {
      this.renderer.setAttribute(
        this.fieldEl()?.elementRef.nativeElement,
        'aria-describedby',
        this.ariaDescribedBy(),
      );
    });
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.fieldEl()?.elementRef.nativeElement,
      'id',
      this.fieldId,
    );

    if (this.control()) {
      this.isInvalid.set(this.control()?.status === 'INVALID');
      this.control()?.statusChanges?.subscribe((status) => {
        this.isInvalid.set(status === 'INVALID');
      });
    }
  }
}
