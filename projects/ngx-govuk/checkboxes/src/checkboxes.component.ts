import {
  Component,
  computed,
  contentChildren,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';

/**
 * One checkbox in `ngx-govuk-checkboxes`. Its content is the label.
 *
 * Each checkbox is its own form control, whose value is `true` when it's
 * checked. Bind it with `formControlName`, `[formControl]` or `[(ngModel)]`,
 * or to a signal with `[(checked)]`.
 */
@Component({
  selector: 'ngx-govuk-checkbox',
  templateUrl: './checkbox.component.html',
  host: { class: 'govuk-checkboxes__item' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxGovukCheckbox),
      multi: true,
    },
  ],
})
export class NgxGovukCheckbox implements ControlValueAccessor {
  protected group = inject(NgxGovukCheckboxes);

  /**
   * Whether the checkbox is checked.
   */
  checked = model<boolean>(false);

  /**
   * Hint text for this checkbox.
   */
  hint = input<string>();

  /**
   * Stops users changing this checkbox. With a form control, disable the
   * control instead.
   */
  disabled = input<boolean>(false);

  private formDisabled = signal(false);
  private onChange: (value: boolean) => void = () => {};

  protected onTouched: () => void = () => {};
  protected inputId = computed(() => this.group.checkboxId(this));
  protected hintId = computed(() => `${this.inputId()}-item-hint`);
  protected isDisabled = computed(() => this.disabled() || this.formDisabled());

  protected toggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checked.set(checked);
    this.onChange(checked);
  }

  writeValue(value: boolean | null): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}

/**
 * Lets users select one or more options from a list.
 *
 * Put an `ngx-govuk-checkbox` inside it for each option. It adds the fieldset,
 * legend, hint and error message. To keep the checkboxes' form controls
 * together, put `formGroupName` on it.
 *
 * The first checkbox's id is the `name`, so an error summary can link to it.
 * The others are `<name>-2`, `<name>-3` and so on, as in GOV.UK Frontend.
 */
@Component({
  selector: 'ngx-govuk-checkboxes',
  templateUrl: './checkboxes.component.html',
})
export class NgxGovukCheckboxes {
  /**
   * The legend, which asks the question.
   */
  legend = input.required<string>();

  /**
   * The legend's size. When unset, the legend is `l` if it's the page heading,
   * and body size otherwise.
   */
  legendSize = input<'s' | 'm' | 'l' | 'xl'>();

  /**
   * Makes the legend the page heading. Use it when the page asks just one
   * question.
   */
  asPageHeading = input<boolean>(false);

  /**
   * Hint text, to help users answer the question.
   */
  hint = input<string>();

  /**
   * The error message. When it's set, the checkboxes show their error styles.
   * Set it when validation fails, such as after the form is submitted.
   */
  errorMessage = input<string | null>();

  /**
   * The checkboxes' `name`, which their ids are based on. When unset, one is
   * generated.
   */
  name = input<string>();

  /**
   * Shows smaller checkboxes.
   */
  small = input<boolean>(false);

  private generatedName = inject(NgxGovukUtilsService).randomId('checkboxes');
  private checkboxes = contentChildren(NgxGovukCheckbox, { descendants: true });

  /** @internal */
  groupName = computed(() => this.name() ?? this.generatedName);

  protected hintId = computed(() => `${this.groupName()}-hint`);
  protected errorId = computed(() => `${this.groupName()}-error`);

  protected describedBy = computed(
    () =>
      [
        this.hint() ? this.hintId() : '',
        this.errorMessage() ? this.errorId() : '',
      ]
        .filter(Boolean)
        .join(' ') || null,
  );

  protected legendClasses = computed(() => {
    const size = this.legendSize() ?? (this.asPageHeading() ? 'l' : undefined);
    return size
      ? `govuk-fieldset__legend govuk-fieldset__legend--${size}`
      : 'govuk-fieldset__legend';
  });

  /** @internal */
  checkboxId(checkbox: NgxGovukCheckbox): string {
    const index = this.checkboxes().indexOf(checkbox);
    return index > 0 ? `${this.groupName()}-${index + 1}` : this.groupName();
  }
}
