import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  signal,
} from '@angular/core';
import { NgxGovukAccordionPanelComponent } from './accordion-panel.component';

@Component({
  selector: 'ngx-govuk-accordion',
  standalone: true,
  imports: [CommonModule, NgxGovukAccordionPanelComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukAccordionComponent {
  @ContentChildren(NgxGovukAccordionPanelComponent)
  panels!: QueryList<NgxGovukAccordionPanelComponent>;
  isExpanded = signal(false);

  toggle() {
    this.isExpanded.set(!this.isExpanded());
    this.panels.toArray().forEach((panel) => {
      panel.isExpanded.set(this.isExpanded());
    });
  }
}
