import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, type Meta } from '@storybook/angular';
import { NgxGovukFormGroup } from '../../../form-group/src/form-group.component';
import { NgxGovukFieldsetComponent } from '../fieldset/fieldset.component';
import { NgxGovukRadioGroupComponent } from './radio-group.component';
import { NgxGovukRadioComponent } from './radio.component';

const meta: Meta<NgxGovukRadioGroupComponent> = {
  component: NgxGovukRadioGroupComponent,
  title: 'Form Components/Radios',
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        NgxGovukFieldsetComponent,
        NgxGovukFormGroup,
        NgxGovukRadioComponent,
      ],
    }),
  ],
};

export default meta;

export const Radios = {
  args: {
    asPageHeading: true,
  },
  render: (args: NgxGovukFieldsetComponent) => ({
    props: {
      asPageHeading: args.asPageHeading,
      form: new FormGroup({
        whereDoYouLive: new FormControl(),
      }),
    },
    template: `
<form [formGroup]="form">
  <ngx-govuk-fieldset legend="Where do you live?" [asPageHeading]="asPageHeading">
    <ngx-govuk-radio-group formControlName="whereDoYouLive">
      <ngx-govuk-radio value="england" label="England"></ngx-govuk-radio>
      <ngx-govuk-radio value="scotland" label="Scotland"></ngx-govuk-radio>
      <ngx-govuk-radio value="wales" label="Wales"></ngx-govuk-radio>
    </ngx-govuk-radio-group>
  </ngx-govuk-fieldset>

  {{ form.value | json }}

</form>
`,
  }),
};
