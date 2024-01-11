import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  signal,
} from '@angular/core';
import { NgxGovukAccordionPanelComponent } from './ngx-govuk-accordion-panel.component';

@Component({
  selector: 'ngx-govuk-accordion',
  standalone: true,
  imports: [CommonModule, NgxGovukAccordionPanelComponent],
  templateUrl: './ngx-govuk-accordion.component.html',
  styleUrl: './ngx-govuk-accordion.component.scss',
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
