import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Component to render the GOV.UK details component.
 *
 * @selector ngx-govuk-details
 */
@Component({
  selector: 'ngx-govuk-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukDetails {
  /**
   * The main summary label.
   * @required
   */
  summaryText = input.required<string>();
  /**
   * The expandable text content.
   * @required
   */
  text = input.required<string>();
}
