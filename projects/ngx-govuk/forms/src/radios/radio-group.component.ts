/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Renderer2,
  contentChildren,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukRadioComponent } from './radio.component';

@Component({
  selector: 'ngx-govuk-radio-group',
  imports: [],
  templateUrl: './radio-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxGovukRadioGroupComponent),
      multi: true,
    },
  ],
})
export class NgxGovukRadioGroupComponent
  implements AfterViewInit, ControlValueAccessor
{
  private renderer = inject(Renderer2);
  private utilsService = inject(NgxGovukUtilsService);

  @HostBinding('class') get className() {
    return 'govuk-radios';
  }

  groupName = this.utilsService.randomId('radio-group');

  radios = contentChildren(NgxGovukRadioComponent);

  value!: string;

  ngAfterViewInit(): void {
    this.radios().forEach((radio) => {
      this.renderer.setAttribute(
        radio.inputEl()?.nativeElement,
        'name',
        this.groupName,
      );
      radio.selected.subscribe((value) => {
        this.onChange(value);
      });
    });
  }

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
}
