import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { GUIDES } from './get-started.data';

/**
 * Layout for the get started section: a menu of guides beside the page. On
 * small screens the menu is collapsed behind a button, and closes again after
 * choosing a page.
 */
@Component({
  selector: 'ngx-govuk-get-started-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './get-started-layout.component.html',
})
export class GetStartedLayoutComponent {
  guides = GUIDES;

  /** Whether the menu is open on small screens. Desktop always shows it. */
  protected expanded = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.expanded.set(false));
  }
}
