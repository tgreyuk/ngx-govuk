import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** What ngx-govuk does differently from GOV.UK Frontend. */
@Component({
  selector: 'ngx-govuk-differences-guide',
  host: { class: 'app-numbered-sections' },
  imports: [RouterLink],
  templateUrl: './differences-guide.component.html',
})
export class DifferencesGuideComponent {
  contents = [
    { id: 'javascript', heading: "GOV.UK Frontend's JavaScript" },
    { id: 'options', heading: 'Options' },
    { id: 'forms', heading: 'Forms' },
    { id: 'links', heading: 'Links' },
  ];
}
