import { moduleMetadata, type Meta } from '@storybook/angular';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFieldsetComponent } from '../fieldset/fieldset.component';
import { NgxGovukFormGroupComponent } from '../form-group/form-group.component';
import { NgxGovukDateInputComponent } from './date-input.component';

const meta: Meta<NgxGovukDateInputComponent> = {
  component: NgxGovukDateInputComponent,
  title: 'Form Components/Date Input',
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        NgxGovukFieldsetComponent,
        NgxGovukFormGroupComponent,
      ],
    }),
  ],
};

export default meta;

export const DateInput = {
  render: () => ({
    props: {
      form: new FormGroup({
        date: new FormControl(),
      }),
    },
    template: `
<form [formGroup]="form">

  <ngx-govuk-date-input formControlName="date"></ngx-govuk-date-input>

  {{ form.value | json }}

</form>
`,
  }),
};
