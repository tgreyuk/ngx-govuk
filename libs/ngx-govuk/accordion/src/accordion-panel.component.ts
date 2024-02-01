import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'ngx-govuk-accordion-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-panel.component.html',
  styleUrl: './accordion-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukAccordionPanelComponent {
  @Input({ required: true }) heading!: string;

  isExpanded = signal(false);

  headingId = nanoid();
  contentId = nanoid();

  toggle() {
    this.isExpanded.set(!this.isExpanded());
  }
}
