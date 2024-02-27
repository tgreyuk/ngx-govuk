import { moduleMetadata, type Meta } from '@storybook/angular';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxGovukTextareaDirective } from '../forms/src/textarea/textarea.directive';
import { NgxGovukTextInput } from '../text-input/text-input.directive';
import { NgxGovukFormGroup } from './form-group.component';

const meta: Meta<NgxGovukFormGroup> = {
  component: NgxGovukFormGroup,
  title: 'Components/Form Group',
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        NgxGovukTextInput,
        NgxGovukTextareaDirective,
      ],
    }),
  ],
};
export default meta;

const commonArgs = {
  label: 'What is the name of the event?',
  hint: "The name you'll use on promotional material",
  asPageHeading: true,
};

export const Basic = {
  args: { ...commonArgs, prefix: '£', suffix: 'per person' },
  render: (args: NgxGovukFormGroup) => ({
    props: {
      ...args,
    },
    template: `
<div style="max-width: 500px;">
  <ngx-govuk-form-group [label]="label" [hint]="hint" [asPageHeading]="asPageHeading" [prefix]="prefix" [suffix]="suffix">
    <input type="text" ngxGovukTextInput />
  </ngx-govuk-form-group>
</div>
`,
  }),
};

export const Error = {
  args: { ...commonArgs, errorMessage: 'Enter an event name' },
  render: (args: NgxGovukFormGroup) => ({
    props: {
      ...args,
      form: new FormGroup({
        inputTest: new FormControl(null, Validators.required),
      }),
    },
    template: `
<form [formGroup]="form">
  <ngx-govuk-form-group [label]="label" [hint]="hint" [asPageHeading]="asPageHeading" [errorMessage]="errorMessage">
    <input type="text" ngxGovukTextInput formControlName="inputTest" />
  </ngx-govuk-form-group>
</form>
`,
  }),
};
