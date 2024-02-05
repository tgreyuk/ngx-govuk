import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  Renderer2,
  signal,
} from '@angular/core';
import { NgxGovukTextareaDirective } from '../textarea/textarea.directive';

@Component({
  selector: 'ngx-govuk-character-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-count.component.html',
  styleUrl: './character-count.component.scss',
})
export class NgxGovUkCharacterCountComponent implements AfterViewInit {
  @Input() limit = 200;

  @ContentChild(NgxGovukTextareaDirective)
  textarea!: NgxGovukTextareaDirective;

  count = signal(0);

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.count.set(this.limit);
    this.renderer.setAttribute(
      this.textarea.field,
      'maxLength',
      this.limit.toString()
    );
    this.renderer.listen(this.textarea.field, 'input', () => {
      const newCount = this.limit - this.textarea.field.value.length;

      this.count.set(newCount);
    });
  }
}
