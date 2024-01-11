import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'ngx-govuk-form-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-govuk-form-group.component.html',
  styleUrl: './ngx-govuk-form-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukFormGroupComponent implements AfterViewInit {
  @Input({ required: true }) label!: string;
  @Input() hint!: string;
  @Input() asPageHeading = false;

  elId = nanoid();
  hintId = nanoid();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const field = this.elementRef.nativeElement.querySelector('input');
    if (field) {
      this.renderer.setAttribute(field, 'id', this.elId);

      if (this.hint) {
        this.renderer.setAttribute(field, 'aria-describedby', this.hintId);
      }
    }
  }
}
