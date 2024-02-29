import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { NgxGovukTextInput } from './text-input.directive';

const meta: Meta<NgxGovukTextInput> = {
  component: NgxGovukTextInput,
  title: 'Components/Text Input',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  argTypes: {
    inputWidth: {
      options: [
        'full',
        'three-quarters',
        'two-thirds',
        'one-half',
        'one-third',
        'one-quarter',
        '20',
        '10',
        '5',
        '4',
        '3',
        '2',
      ],
      control: { type: 'select' },
    },
  },
};
export default meta;

export const Basic = {
  args: {
    width: 'full',
  },
  render: (args: NgxGovukTextInput) => ({
    props: {
      ...args,
    },
    template: `
      <input ngxGovukTextInput formControlName="inputTest" type="text" [width]="width" />
    `,
  }),
};

export const Error = {
  args: {
    width: 'full',
  },
  render: (args: NgxGovukTextInput) => ({
    props: {
      ...args,
      form: new FormGroup({
        inputTest: new FormControl(null, Validators.required),
      }),
    },
    template: `
    <form [formGroup]="form">
      <input ngxGovukTextInput formControlName="inputTest" type="text" [width]="width" />
    </form>
    `,
  }),
};
