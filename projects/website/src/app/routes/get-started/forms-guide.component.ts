import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../components/component-code/code-block.component';

/** Guide to building form fields with `ngx-govuk-form-group`. */
@Component({
  selector: 'ngx-govuk-forms-guide',
  imports: [RouterLink, CodeBlockComponent],
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

  ERROR_CODE = `<ngx-govuk-form-group label="What is your email address?">
  @if (submitted() && email.invalid) {
    <p ngxGovukErrorMessage>
      Enter an email address in the correct format, like name@example.com
    </p>
  }
  <input id="email" formControlName="email" ngxGovukTextInput />
</ngx-govuk-form-group>`;

  SUMMARY_HTML_CODE = `@if (submitted() && errors().length) {
  <ngx-govuk-error-summary [errorList]="errors()" />
}

<h1 class="govuk-heading-l">Contact details</h1>

<form [formGroup]="form" (ngSubmit)="continue()" novalidate>
  <ngx-govuk-form-group label="What is your email address?">
    @if (submitted() && emailError(); as error) {
      <p ngxGovukErrorMessage>{{ error }}</p>
    }
    <input id="email" type="email" formControlName="email" ngxGovukTextInput />
  </ngx-govuk-form-group>

  <button type="submit" ngxGovukButton>Continue</button>
</form>`;

  SUMMARY_TS_CODE = `export class ContactDetailsComponent {
  private title = inject(Title);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  submitted = signal(false);

  emailError() {
    return this.form.controls.email.invalid
      ? 'Enter an email address in the correct format, like name@example.com'
      : null;
  }

  errors(): NgxGovukErrorSummaryItem[] {
    const email = this.emailError();
    return email ? [{ text: email, href: '#email' }] : [];
  }

  continue() {
    this.submitted.set(true);
    const prefix = this.errors().length ? 'Error: ' : '';
    this.title.setTitle(\`\${prefix}Contact details – Your service\`);
  }
}`;

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
