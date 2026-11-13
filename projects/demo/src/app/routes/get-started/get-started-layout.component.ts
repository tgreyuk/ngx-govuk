import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GUIDES } from './get-started.data';

/** Layout for the get started section: a menu of guides beside the page. */
@Component({
  selector: 'ngx-govuk-get-started-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './get-started-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetStartedLayoutComponent {
  guides = GUIDES;
}
