import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// Read from the library's own package.json so the site always shows the
// version it documents, with nothing to update by hand at release time.
import { version } from '../../../ngx-govuk/package.json';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'ngx-govuk-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-govuk-demo';
  version = version;

  // The page has a `base` element, so a plain `#main-content` link would go
  // to the home page. Move focus to the main content instead.
  protected skipToMain(event: MouseEvent, main: HTMLElement) {
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    main.setAttribute('tabindex', '-1');
    main.addEventListener('blur', () => main.removeAttribute('tabindex'), {
      once: true,
    });
    main.focus();
  }
}
