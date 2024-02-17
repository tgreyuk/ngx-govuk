import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ngx-govuk-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxgovukCookieBannerComponent {
  headingText = input.required<string>();
}
