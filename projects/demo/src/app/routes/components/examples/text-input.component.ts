import { Component } from '@angular/core';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-text-input-demo',
  imports: [NgxGovukFormGroup, NgxGovukTextInput],
  template: `
    <ngx-govuk-form-group label="What is the name of the event?">
      <input
        id="event-name"
        type="text"
        ngxGovukTextInput
        inputWidth="three-quarters"
      />
    </ngx-govuk-form-group>

    <ngx-govuk-form-group
      label="Postcode"
      hint="For example, SW1A 2AA"
      labelSize="s"
    >
      <input
        id="postcode"
        type="text"
        autocomplete="postal-code"
        spellcheck="false"
        ngxGovukTextInput
        inputWidth="10"
      />
    </ngx-govuk-form-group>
  `,
})
export class TextInputDemoComponent {}
