import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** What ngx-govuk does differently from GOV.UK Frontend, and what it leaves out. */
@Component({
  selector: 'ngx-govuk-differences-guide',
  host: { class: 'app-numbered-sections' },
  imports: [RouterLink],
  templateUrl: './differences-guide.component.html',
})
export class DifferencesGuideComponent {
  contents = [
    { id: 'javascript', heading: "GOV.UK Frontend's JavaScript is not used" },
    { id: 'options', heading: 'Options are Angular inputs' },
    { id: 'forms', heading: 'Forms use Angular forms' },
    { id: 'links', heading: 'Links use the router' },
    { id: 'behaviour', heading: 'Behaviour that differs' },
    { id: 'not-included', heading: 'Not included' },
  ];
}
