import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  contentChild,
  contentChildren,
  Directive,
  effect,
  EmbeddedViewRef,
  forwardRef,
  inject,
  input,
  model,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';

/**
 * Content shown under an option only while it's selected, such as a question
 * that only applies to that answer.
 *
 * Add it with a `*` to the content inside `ngx-govuk-radio`, such as an
 * `ngx-govuk-form-group`, or put it on an `ng-template` around several
 * elements. The content stays on the page while it's hidden, so any answers
 * in it are kept.
 */
@Directive({
  selector: '[ngxGovukRadioConditional]',
})
export class NgxGovukRadioConditional {
  /** @internal */
  readonly template = inject(TemplateRef);
}

/**
 * One option in `ngx-govuk-radios`. Its content is the label.
 *
 * To show more content while it's selected, add it with
 * `*ngxGovukRadioConditional`.
 */
@Component({
  selector: 'ngx-govuk-radio',
  imports: [NgTemplateOutlet],
  templateUrl: './radio.component.html',
  host: { class: 'govuk-radios__item' },
})
export class NgxGovukRadio {
  protected group = inject(NgxGovukRadios);

  /**
   * The value the radios take when this option is selected.
   */
  value = input.required<string>();

  /**
   * Hint text for this option.
   */
  hint = input<string>();

  /**
   * Stops users selecting this option. To disable all the options, disable the
   * form control instead.
   */
  disabled = input<boolean>(false);

  protected inputId = computed(() => this.group.radioId(this));
  protected hintId = computed(() => `${this.inputId()}-item-hint`);
  protected conditionalId = computed(() => `conditional-${this.inputId()}`);
  protected conditional = contentChild(NgxGovukRadioConditional);
  private reveal = viewChild<TemplateRef<unknown>>('reveal');
  private revealView?: EmbeddedViewRef<unknown>;

  constructor() {
    // GOV.UK Frontend puts the conditional content straight after the item,
    // not inside it, so render it into the item's own view container.
    const container = inject(ViewContainerRef);
    effect(() => {
      const reveal = this.reveal();
      if (this.conditional() && reveal && !this.revealView) {
        this.revealView = container.createEmbeddedView(reveal);
      } else if (!this.conditional() && this.revealView) {
        this.revealView.destroy();
        this.revealView = undefined;
      }
    });
  }
  protected checked = computed(() => this.group.value() === this.value());
  protected isDisabled = computed(
    () => this.disabled() || this.group.formDisabled(),
  );
}

/**
 * Lets users select a single option from a list.
 *
 * Put an `ngx-govuk-radio` inside it for each option. Bind it to a form
 * control with `formControlName`, `[formControl]` or `[(ngModel)]`, or to a
 * signal with `[(value)]`. It adds the fieldset, legend, hint and error
 * message.
 *
 * The first option's id is the `name`, so an error summary can link to it.
 * The others are `<name>-2`, `<name>-3` and so on, as in GOV.UK Frontend.
 */
@Component({
  selector: 'ngx-govuk-radios',
  templateUrl: './radios.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxGovukRadios),
      multi: true,
    },
  ],
})
export class NgxGovukRadios implements ControlValueAccessor {
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
   * The error message. When it's set, the radios show their error styles. Set
   * it when validation fails, such as after the form is submitted.
   */
  errorMessage = input<string | null>();

  /**
   * The radios' `name`, which their ids are based on. When unset, one is
   * generated.
   */
  name = input<string>();

  /**
   * Shows the options side by side. Use it only for two short options, such
   * as Yes and No.
   */
  inline = input<boolean>(false);

  /**
   * Shows smaller radios.
   */
  small = input<boolean>(false);

  /**
   * The selected option's value, or `null` when none is selected.
   */
  value = model<string | null>(null);

  private generatedName = inject(NgxGovukUtilsService).randomId('radios');
  private radios = contentChildren(NgxGovukRadio, { descendants: true });
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  /** @internal */
  groupName = computed(() => this.name() ?? this.generatedName);

  /** @internal */
  formDisabled = signal(false);

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
  radioId(radio: NgxGovukRadio): string {
    const index = this.radios().indexOf(radio);
    return index > 0 ? `${this.groupName()}-${index + 1}` : this.groupName();
  }

  /** @internal */
  select(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  /** @internal */
  touch(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
