import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';

@Component({
  selector: 'ngx-govuk-form-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukFormGroupComponent implements AfterViewInit {
  @Input({ required: true }) label!: string;
  @Input() hint!: string;
  @Input() asPageHeading = false;

  fieldId = this.utilsService.randomId('field');
  hintId = this.utilsService.randomId('hint');

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private utilsService: NgxGovukUtilsService
  ) {}

  ngAfterViewInit(): void {
    const field = this.elementRef.nativeElement.querySelector('input,textarea');
    if (field) {
      this.renderer.setAttribute(field, 'id', this.fieldId);
      if (this.hint) {
        this.renderer.setAttribute(field, 'aria-describedby', this.hintId);
      }
    }
  }
}
