import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Renderer2,
  contentChildren,
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ngx-govuk-tabs-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukTabsNavComponent implements AfterViewInit {
  @HostBinding('class') get className() {
    return `govuk-tabs`;
  }

  tabLinks = contentChildren<RouterLinkActive>('ngxGovukTabsLink');

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const nativeLinkEls = [...this.el.nativeElement.getElementsByTagName('a')];
    nativeLinkEls.forEach((nativeLinkEl) => {
      const listItem = this.renderer.createElement('li');
      const parent = nativeLinkEl.parentNode;
      this.renderer.addClass(nativeLinkEl, 'govuk-tabs__tab');
      this.renderer.addClass(listItem, 'govuk-tabs__list-item');
      this.renderer.insertBefore(parent, listItem, nativeLinkEl);
      this.renderer.appendChild(listItem, nativeLinkEl);
    });

    this.tabLinks().forEach((tabLink, i) => {
      console.log(tabLink);
      const nativeLiEls = [...this.el.nativeElement.getElementsByTagName('li')];
      tabLink?.isActiveChange.subscribe((isActive) => {
        if (isActive) {
          this.renderer.addClass(
            nativeLiEls[i],
            'govuk-tabs__list-item--selected'
          );
        } else {
          this.renderer.removeClass(
            nativeLiEls[i],
            'govuk-tabs__list-item--selected'
          );
        }
      });
    });
  }
}
