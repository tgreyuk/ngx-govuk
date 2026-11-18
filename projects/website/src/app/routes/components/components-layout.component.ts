import { NgTemplateOutlet } from '@angular/common';
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
import { COMPONENTS } from './components.data';

/**
 * Layout for the components section: the full GOV.UK component list as a
 * menu beside the current page. Components without documentation yet are shown
 * in a muted colour and link to a placeholder page. On small screens the menu
 * is collapsed behind a button, and closes again after choosing a page.
 */
@Component({
  selector: 'ngx-govuk-components-layout',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './components-layout.component.html',
})
export class ComponentsLayoutComponent {
  components = COMPONENTS;

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
