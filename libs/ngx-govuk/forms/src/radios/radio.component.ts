/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  input,
  viewChild,
} from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'ngx-govuk-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukRadioComponent {
  @HostBinding('class') get className() {
    return 'govuk-radios__item';
  }

  selected = new EventEmitter<string>();

  label = input.required<string>();
  value = input.required<string>();
  inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  elId = nanoid();

  onSelected() {
    this.selected.emit(this.value());
  }
}
