import { moduleMetadata, type Meta } from '@storybook/angular';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from '../../../form-group/form-group.component';
import { NgxGovukFieldsetComponent } from '../fieldset/fieldset.component';
import { NgxGovukCheckboxComponent } from './checkbox.component';
import { NgxGovukCheckboxesDirective } from './checkboxes.directive';

const meta: Meta<NgxGovukCheckboxesDirective> = {
  component: NgxGovukCheckboxesDirective,
  title: 'Form Components/Checkboxes',
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        NgxGovukFieldsetComponent,
        NgxGovukFormGroup,
        NgxGovukCheckboxComponent,
      ],
    }),
  ],
};

export default meta;

export const Checkboxes = {
  render: () => ({
    props: {
      form: new FormGroup({
        animals: new FormControl(false),
        quarries: new FormControl(false),
        agricultural: new FormControl(true),
      }),
    },
    template: `
<form [formGroup]="form">
  <ngx-govuk-fieldset legend="Which types of waste do you transport?" hint="Select all that apply">
    <div ngxGovukCheckboxes>
      <ngx-govuk-checkbox formControlName="animals" label="Waste from animal carcasses"></ngx-govuk-checkbox>
      <ngx-govuk-checkbox formControlName="quarries" label="Waste from mines or quarries"></ngx-govuk-checkbox>
      <ngx-govuk-checkbox formControlName="agricultural" label="Farm or agricultural waste"></ngx-govuk-checkbox>
    </div>
  </ngx-govuk-fieldset>

  {{ form.value | json }}

</form>
`,
  }),
};
