/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukFieldsetComponent } from '../fieldset/fieldset.component';

@Component({
  selector: 'ngx-govuk-date-input',
  standalone: true,
  imports: [CommonModule, NgxGovukFieldsetComponent, FormsModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxGovukDateInputComponent),
      multi: true,
    },
  ],
})
export class NgxGovukDateInputComponent implements ControlValueAccessor {
  dayId = this.utilsService.randomId('day');
  monthId = this.utilsService.randomId('month');
  yearId = this.utilsService.randomId('year');

  day!: number;
  month!: number;
  year!: number;

  value!: string;

  constructor(private utilsService: NgxGovukUtilsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onDateChange(): void {
    this.onChange(`${this.day}/${this.month}/${this.year}`);
  }
}
