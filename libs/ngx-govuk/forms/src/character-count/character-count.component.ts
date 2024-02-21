import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Renderer2,
  computed,
  effect,
  input,
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
  @ContentChild(NgxGovukTextareaDirective)
  textarea!: NgxGovukTextareaDirective;

  limit = input(200);
  count = signal(0);

  remainingCount = computed(() => {
    const remaining = this.limit() - this.count();
    return remaining < 0 ? 0 : remaining;
  });

  constructor(private renderer: Renderer2) {
    effect(() => {
      this.setMaxLength();
    });
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.textarea?.field, 'input', () => {
      this.count.set(this.textarea?.field.value.length);
    });
  }

  setMaxLength(): void {
    if (this.textarea?.field.maxLength != this.limit()) {
      if (this.textarea?.field.value) {
        this.textarea.field.value = this.textarea?.field.value.substring(
          0,
          this.limit()
        );
      }

      this.renderer.setAttribute(
        this.textarea.field,
        'maxLength',
        this.limit().toString()
      );
    }
  }
}
