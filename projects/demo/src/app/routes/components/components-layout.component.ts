import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { COMPONENTS } from './components.data';

/**
 * Layout for the components section: the full GOV.UK component list as a
 * menu beside the current page. Components without documentation yet are shown
 * in a muted colour and link to a placeholder page.
 */
@Component({
  selector: 'ngx-govuk-components-layout',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './components-layout.component.html',
})
export class ComponentsLayoutComponent {
  components = COMPONENTS;
}
