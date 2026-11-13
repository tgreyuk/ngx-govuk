import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GUIDES } from './get-started.data';

/** Get started landing page: what ngx-govuk needs, and the guides. */
@Component({
  selector: 'ngx-govuk-get-started-overview',
  imports: [RouterLink],
  templateUrl: './get-started-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetStartedOverviewComponent {
  guides = GUIDES;
}
