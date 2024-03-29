import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  signal,
} from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';
/**
 * Component to be used to define the accordion panels.
 *
 * The content slot should contain the content of the accordion panel.
 *
 * @selector ngx-govuk-accordion-panel
 */
@Component({
  selector: 'ngx-govuk-accordion-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukAccordionPanel {
  @HostBinding('class') get className() {
    const classes = ['govuk-accordion__section'];
    if (this.isExpanded()) {
      classes.push('govuk-accordion__section--expanded');
    }
    return classes.join(' ');
  }

  /**
   * The heading of the panel
   * @required
   */
  heading = input.required<string>();

  /**
   * Flag to determine if the accordion panel is expanded.
   */
  isExpanded = signal(false);

  headingId = this.utilsService.randomId('heading');
  contentId = this.utilsService.randomId('content');

  constructor(private utilsService: NgxGovukUtilsService) {}

  /**
   * Toggles the accordion panel visibility.
   */
  toggle() {
    this.isExpanded.set(!this.isExpanded());
  }
}
