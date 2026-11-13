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
  /**
   * How the GOV.UK Design System link names the component in "documentation
   * on …", when adding an "s" to the name doesn't work.
   */
  plural?: string;
  /** A form field used inside `ngx-govuk-form-group`. */
  isField?: boolean;
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
    status: 'in-progress',
    description:
      'Tells users how many characters or words they can still enter.',
    isField: true,
  },
  {
    name: 'Checkboxes',
    id: 'checkboxes',
    status: 'in-progress',
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
    status: 'in-progress',
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
    status: 'to-do',
    description: 'Explains what went wrong with an answer and how to fix it.',
  },
  {
    name: 'Error summary',
    id: 'error-summary',
    status: 'to-do',
    description:
      'Lists the errors on a page when validation fails, linking to each one.',
  },
  {
    name: 'Exit this page',
    plural: 'the exit this page component',
    id: 'exit-this-page',
    status: 'to-do',
    description:
      'Gives users a quick way to leave a page that shows sensitive information.',
  },
  {
    name: 'Feedback',
    plural: 'feedback',
    id: 'feedback',
    status: 'to-do',
    description:
      'Asks users whether a page was useful and lets them report a problem.',
  },
  {
    name: 'Fieldset',
    id: 'fieldset',
    status: 'in-progress',
    description:
      'Groups related form inputs together, such as the parts of an address.',
  },
  {
    name: 'File upload',
    id: 'file-upload',
    status: 'to-do',
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
    status: 'to-do',
    description: 'The header that tells users they are using a GOV.UK service.',
  },
  {
    name: 'Inset text',
    plural: 'inset text',
    id: 'inset-text',
    status: 'to-do',
    description: 'Sets a block of text apart from the content around it.',
  },
  {
    name: 'Language navigation',
    plural: 'language navigation',
    id: 'language-navigation',
    status: 'to-do',
    description: 'Lets users switch the language a page is shown in.',
  },
  {
    name: 'Notification banner',
    id: 'notification-banner',
    status: 'to-do',
    description:
      'Tells users about something important, such as the result of an action.',
  },
  {
    name: 'Pagination',
    plural: 'pagination',
    id: 'pagination',
    status: 'to-do',
    description:
      'Helps users move between related pages, such as search results.',
  },
  {
    name: 'Panel',
    id: 'panel',
    status: 'to-do',
    description:
      'A highlighted container used on confirmation and results pages.',
  },
  {
    name: 'Password input',
    id: 'password-input',
    status: 'to-do',
    description: 'Helps users enter a password, with an option to show it.',
  },
  {
    name: 'Phase banner',
    id: 'phase-banner',
    status: 'to-do',
    description:
      'Shows that a service is still being worked on, such as in alpha or beta.',
  },
  {
    name: 'Radios',
    id: 'radios',
    status: 'to-do',
    description: 'Lets users select a single option from a list.',
  },
  {
    name: 'Select',
    id: 'select',
    status: 'to-do',
    description:
      'Lets users choose an option from a long list when radios are not practical.',
  },
  {
    name: 'Service navigation',
    plural: 'service navigation',
    id: 'service-navigation',
    status: 'to-do',
    description:
      'Shows users which service they are using and helps them move around it.',
  },
  {
    name: 'Skip link',
    id: 'skip-link',
    status: 'to-do',
    description:
      'Helps keyboard users skip straight to the main content on a page.',
  },
  {
    name: 'Summary list',
    id: 'summary-list',
    status: 'to-do',
    description:
      "Summarises information, such as a user's answers at the end of a form.",
  },
  {
    name: 'Table',
    id: 'table',
    status: 'to-do',
    description: 'Makes information easier to compare and scan.',
  },
  {
    name: 'Tabs',
    id: 'tabs',
    status: 'in-progress',
    description:
      'Lets users move between related sections of content, one at a time.',
  },
  {
    name: 'Tag',
    id: 'tag',
    status: 'to-do',
    description: 'Shows users the status of something.',
  },
  {
    name: 'Task list',
    id: 'task-list',
    status: 'to-do',
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
    status: 'in-progress',
    description: 'Lets users enter more than a single line of text.',
    isField: true,
  },
  {
    name: 'Warning text',
    plural: 'warning text',
    id: 'warning-text',
    status: 'to-do',
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
