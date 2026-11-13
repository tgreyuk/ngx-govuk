import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComponentApiComponent } from '../components/component-api/component-api.component';
import { ComponentCodeComponent } from '../components/component-code/component-code.component';
import { FormGroupDemoComponent } from '../components/examples/form-group/default.component';

/** Guide to building form fields with `ngx-govuk-form-group`. */
@Component({
  selector: 'ngx-govuk-forms-guide',
  imports: [
    RouterLink,
    ComponentApiComponent,
    ComponentCodeComponent,
    FormGroupDemoComponent,
  ],
  templateUrl: './forms-guide.component.html',
})
export class FormsGuideComponent {
  FIELD_CODE = `<ngx-govuk-form-group
  label="What is your email address?"
  hint="We'll only use this to send you a receipt"
>
  <input
    id="email"
    type="email"
    autocomplete="email"
    spellcheck="false"
    formControlName="email"
    ngxGovukTextInput
  />
</ngx-govuk-form-group>`;

  ERROR_CODE = `<ngx-govuk-form-group
  label="What is your email address?"
  [errorMessage]="submitted() && email.invalid
    ? 'Enter an email address in the correct format, like name@example.com'
    : null"
>
  <input id="email" formControlName="email" ngxGovukTextInput />
</ngx-govuk-form-group>`;

  LABEL_CODE = `<!-- A smaller heading-style label -->
<ngx-govuk-form-group label="Event name" labelSize="m">…</ngx-govuk-form-group>

<!-- The label as the page's h1, when the page asks one question -->
<ngx-govuk-form-group label="What is the name of the event?" [asPageHeading]="true">
  …
</ngx-govuk-form-group>`;

  AFFIX_CODE = `<ngx-govuk-form-group label="Cost per item" prefix="£" suffix="per item">
  <input id="cost" inputmode="decimal" formControlName="cost" ngxGovukTextInput inputWidth="5" />
</ngx-govuk-form-group>`;
}
