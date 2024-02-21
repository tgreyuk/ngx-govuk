/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  forwardRef,
  input,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';

@Component({
  selector: 'ngx-govuk-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxGovukCheckboxComponent),
      multi: true,
    },
  ],
})
export class NgxGovukCheckboxComponent implements ControlValueAccessor {
  @HostBinding('class') get className() {
    return 'govuk-checkboxes__item';
  }

  label = input.required<string>();
  value = model(false);

  fieldId = this.utilsService.randomId('field');

  constructor(private utilsService: NgxGovukUtilsService) {}

  onChecked(event: Event) {
    const target = event.target as HTMLInputElement;
    this.onChange(target.checked);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: boolean) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
