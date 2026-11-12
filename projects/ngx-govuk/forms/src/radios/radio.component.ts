import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  input,
  viewChild,
  inject,
} from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';

@Component({
  selector: 'ngx-govuk-radio',
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukRadioComponent {
  private utilsService = inject(NgxGovukUtilsService);

  @HostBinding('class') get className() {
    return 'govuk-radios__item';
  }

  selected = new EventEmitter<string>();

  label = input.required<string>();
  value = input.required<string>();
  inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  elId = this.utilsService.randomId('radio');

  onSelected() {
    this.selected.emit(this.value());
  }
}
