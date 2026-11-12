import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'ngx-govuk-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-govuk-demo';
}
