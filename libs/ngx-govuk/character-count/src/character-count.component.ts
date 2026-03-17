
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
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

@Component({
  selector: 'ngx-govuk-character-count',
  standalone: true,
  imports: [],
  templateUrl: './character-count.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovUkCharacterCount implements AfterViewInit {
  @ContentChild(NgxGovukTextarea)
  textarea!: NgxGovukTextarea;

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
    if (this.textarea?.field) {
      this.renderer.listen(this.textarea.field, 'input', () => {
        this.count.set(this.textarea.field.value.length);
      });
    }
  }

  setMaxLength(): void {
    if (!this.textarea?.field) {
      return;
    }

    if (this.textarea.field.maxLength != this.limit()) {
      if (this.textarea.field.value) {
        this.textarea.field.value = this.textarea?.field.value.substring(
          0,
          this.limit(),
        );
      }

      this.renderer.setAttribute(
        this.textarea.field,
        'maxLength',
        this.limit().toString(),
      );
    }
  }
}
