export interface Guide {
  name: string;
  path: string;
  /** A one-line summary shown on the get started overview. */
  description: string;
}

/** The get started guides, in menu order. */
export const GUIDES: Guide[] = [
  {
    name: 'Installing ngx-govuk',
    path: '/get-started/installation',
    description:
      'Install ngx-govuk and GOV.UK Frontend, include the styles and choose a font.',
  },
  {
    name: 'Using components',
    path: '/get-started/components',
    description:
      'Import components into your own, set their inputs and outputs, and use their properties and methods.',
  },
  {
    name: 'Working with forms',
    path: '/get-started/forms',
    description:
      'Build form fields with labels, hints and error messages, and show errors the way GOV.UK recommends.',
  },
];
