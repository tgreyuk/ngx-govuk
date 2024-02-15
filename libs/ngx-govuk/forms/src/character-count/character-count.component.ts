import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  Renderer2,
  computed,
  effect,
  signal,
} from '@angular/core';
import { NgxGovukTextareaDirective } from '../textarea/textarea.directive';

@Component({
  selector: 'ngx-govuk-character-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-count.component.html',
  styleUrl: './character-count.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovUkCharacterCountComponent implements AfterViewInit {
  @Input() set limit(limit: number) {
    this.maxLength.set(limit);
  }

  @ContentChild(NgxGovukTextareaDirective)
  textarea!: NgxGovukTextareaDirective;

  count = signal(0);
  maxLength = signal(0);
  remainingCount = computed(() => this.maxLength() - this.count());

  constructor(private renderer: Renderer2) {
    effect(() => {
      this.setMaxLength();
    });
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.textarea.field, 'input', () => {
      this.count.set(this.textarea.field.value.length);
    });
  }

  setMaxLength(): void {
    if (this.textarea.field.maxLength != this.maxLength()) {
      if (this.textarea.field.value) {
        this.textarea.field.value = this.textarea.field.value.substring(
          0,
          this.maxLength()
        );
      }
      this.renderer.setAttribute(
        this.textarea.field,
        'maxLength',
        this.maxLength().toString()
      );
    }
  }
}
