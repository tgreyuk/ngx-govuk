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
}
