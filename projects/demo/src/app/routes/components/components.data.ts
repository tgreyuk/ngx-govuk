/**
 * - documented: has a page on this site
 * - in-progress: exported by the library, but not documented here yet
 * - to-do: not built yet
 */
export type ComponentStatus = 'documented' | 'in-progress' | 'to-do';

export interface ComponentEntry {
  name: string;
  id: string;
  status: ComponentStatus;
  /** A one-line summary of what the component is for. */
  description: string;
  /** A form field used inside `ngx-govuk-form-group`. */
  isField?: boolean;
  /**
   * The entry point the API tab shows, when the component has none of its
   * own, such as the error message, which the form group renders.
   */
  api?: string;
  /** A short note shown at the top of the component's page. */
  note?: string;
}

/** Mirrors https://design-system.service.gov.uk/components/ */
export const COMPONENTS: ComponentEntry[] = [
  {
    name: 'Accordion',
    id: 'accordion',
    status: 'documented',
    description:
      'Lets users show and hide sections of related content on a page.',
  },
  {
    name: 'Back link',
    id: 'back-link',
    status: 'documented',
    description:
      'Helps users go back to the previous page in a multi-page transaction.',
  },
  {
    name: 'Breadcrumbs',
    id: 'breadcrumbs',
    status: 'documented',
    description:
      'Shows users where they are in a website and lets them move up its structure.',
  },
  {
    name: 'Button',
    id: 'button',
    status: 'documented',
    description:
      'Helps users carry out an action, like starting an application or saving their answers.',
  },
  {
    name: 'Character count',
    id: 'character-count',
    status: 'documented',
    description:
      'Tells users how many characters or words they can still enter.',
  },
  {
    name: 'Checkboxes',
    id: 'checkboxes',
    status: 'documented',
    description: 'Lets users select one or more options from a list.',
  },
  {
    name: 'Cookie banner',
    id: 'cookie-banner',
    status: 'to-do',
    description:
      'Lets users accept or reject cookies that are not essential to the service.',
  },
  {
    name: 'Date input',
    id: 'date-input',
    status: 'documented',
    description: 'Helps users enter a date they know or can find easily.',
  },
  {
    name: 'Details',
    id: 'details',
    status: 'documented',
    description:
      'Makes a page easier to scan by letting users reveal more detail when they need it.',
  },
  {
    name: 'Error message',
    id: 'error-message',
    status: 'documented',
    api: 'form-group',
    note: 'There is no separate error message to import. Set "errorMessage" on the form group, or on the radios, checkboxes, date input, character count or password input. Show an error summary at the top of the page too.',
    description: 'Explains what went wrong with an answer and how to fix it.',
  },
  {
    name: 'Error summary',
    id: 'error-summary',
    status: 'documented',
    description:
      'Lists the errors on a page when validation fails, linking to each one.',
  },
  {
    name: 'Exit this page',
    id: 'exit-this-page',
    status: 'to-do',
    description:
      'Gives users a quick way to leave a page that shows sensitive information.',
  },
  {
    name: 'Feedback',
    id: 'feedback',
    status: 'to-do',
    description:
      'Asks users whether a page was useful and lets them report a problem.',
  },
  {
    name: 'Fieldset',
    id: 'fieldset',
    status: 'documented',
    description:
      'Groups related form inputs together, such as the parts of an address.',
  },
  {
    name: 'File upload',
    id: 'file-upload',
    status: 'documented',
    isField: true,
    description: 'Helps users select and upload a file.',
  },
  {
    name: 'Generic header',
    id: 'generic-header',
    status: 'to-do',
    description:
      'A header for services that are not on GOV.UK, without GOV.UK branding.',
  },
  {
    name: 'GOV.UK footer',
    id: 'footer',
    status: 'to-do',
    description: 'The footer at the bottom of every page on GOV.UK.',
  },
  {
    name: 'GOV.UK header',
    id: 'header',
    status: 'documented',
    note: 'Only services on GOV.UK may use the GOV.UK header and logo. Other services should use the generic header.',
    description: 'The header that tells users they are using a GOV.UK service.',
  },
  {
    name: 'Inset text',
    id: 'inset-text',
    status: 'documented',
    description: 'Sets a block of text apart from the content around it.',
  },
  {
    name: 'Language navigation',
    id: 'language-navigation',
    status: 'to-do',
    description: 'Lets users switch the language a page is shown in.',
  },
  {
    name: 'Notification banner',
    id: 'notification-banner',
    status: 'documented',
    description:
      'Tells users about something important, such as the result of an action.',
  },
  {
    name: 'Pagination',
    id: 'pagination',
    status: 'documented',
    description:
      'Helps users move between related pages, such as search results.',
  },
  {
    name: 'Panel',
    id: 'panel',
    status: 'documented',
    description:
      'A highlighted container used on confirmation and results pages.',
  },
  {
    name: 'Password input',
    id: 'password-input',
    status: 'documented',
    description: 'Helps users enter a password, with an option to show it.',
  },
  {
    name: 'Phase banner',
    id: 'phase-banner',
    status: 'documented',
    description:
      'Shows that a service is still being worked on, such as in alpha or beta.',
  },
  {
    name: 'Radios',
    id: 'radios',
    status: 'documented',
    description: 'Lets users select a single option from a list.',
  },
  {
    name: 'Select',
    id: 'select',
    status: 'documented',
    isField: true,
    description:
      'Lets users choose an option from a long list when radios are not practical.',
  },
  {
    name: 'Service navigation',
    id: 'service-navigation',
    status: 'documented',
    description:
      'Shows users which service they are using and helps them move around it.',
  },
  {
    name: 'Skip link',
    id: 'skip-link',
    status: 'documented',
    description:
      'Helps keyboard users skip straight to the main content on a page.',
  },
  {
    name: 'Summary list',
    id: 'summary-list',
    status: 'documented',
    description:
      "Summarises information, such as a user's answers at the end of a form.",
  },
  {
    name: 'Table',
    id: 'table',
    status: 'documented',
    description: 'Makes information easier to compare and scan.',
  },
  {
    name: 'Tabs',
    id: 'tabs',
    status: 'documented',
    description:
      'Lets users move between related sections of content, one at a time.',
  },
  {
    name: 'Tag',
    id: 'tag',
    status: 'documented',
    description: 'Shows users the status of something.',
  },
  {
    name: 'Task list',
    id: 'task-list',
    status: 'documented',
    description:
      'Shows users the tasks they need to complete and the status of each.',
  },
  {
    name: 'Text input',
    id: 'text-input',
    status: 'documented',
    description: 'Lets users enter a single line of text.',
    isField: true,
  },
  {
    name: 'Textarea',
    id: 'textarea',
    status: 'documented',
    description: 'Lets users enter more than a single line of text.',
    isField: true,
  },
  {
    name: 'Warning text',
    id: 'warning-text',
    status: 'documented',
    description:
      'Warns users about something important, such as the consequences of an action.',
  },
];

export function findComponent(id: string | undefined) {
  return COMPONENTS.find((component) => component.id === id);
}

/** Whether a component has its own documentation page. */
export function isDocumented(id: string | undefined) {
  return findComponent(id)?.status === 'documented';
}
