import { Type } from '@angular/core';

/** One demo on a component's page, shown with its own code. */
export interface Example {
  /**
   * The demo's path under `examples/`, without ".component.ts". The build
   * copies the folder to the site, so its template can be shown as code.
   */
  path: string;
  /**
   * Loads the demo component. Each loads only when its page opens, so the
   * site's first download doesn't hold every example and library component.
   */
  load: () => Promise<Type<unknown>>;
  /** Not needed for the first example, which shows the default. */
  title?: string;
  /**
   * A short, factual line on how to get this variant, such as which input to
   * set. Guidance on when to use it belongs to the GOV.UK Design System.
   */
  description?: string;
}

/** Each documented component's examples, in page order. */
export const EXAMPLES: Record<string, Example[]> = {
  accordion: [
    {
      path: 'accordion/default',
      load: () =>
        import('./examples/accordion/default.component').then(
          (m) => m.AccordionDemoComponent,
        ),
    },
  ],
  'back-link': [
    {
      path: 'back-link/default',
      load: () =>
        import('./examples/back-link/default.component').then(
          (m) => m.BackLinkDemoComponent,
        ),
    },
  ],
  breadcrumbs: [
    {
      path: 'breadcrumbs/default',
      load: () =>
        import('./examples/breadcrumbs/default.component').then(
          (m) => m.BreadcrumbsDemoComponent,
        ),
    },
  ],
  button: [
    {
      path: 'button/default',
      load: () =>
        import('./examples/button/default.component').then(
          (m) => m.ButtonDefaultDemoComponent,
        ),
    },
    {
      path: 'button/secondary',
      load: () =>
        import('./examples/button/secondary.component').then(
          (m) => m.ButtonSecondaryDemoComponent,
        ),
      title: 'Secondary button',
      description: 'Set "buttonType" to "secondary".',
    },
    {
      path: 'button/warning',
      load: () =>
        import('./examples/button/warning.component').then(
          (m) => m.ButtonWarningDemoComponent,
        ),
      title: 'Warning button',
      description: 'Set "buttonType" to "warning".',
    },
    {
      path: 'button/start',
      load: () =>
        import('./examples/button/start.component').then(
          (m) => m.ButtonStartDemoComponent,
        ),
      title: 'Start button',
      description:
        'Set "buttonType" to "start" on a link. The button adds the arrow icon.',
    },
    {
      path: 'button/disabled',
      load: () =>
        import('./examples/button/disabled.component').then(
          (m) => m.ButtonDisabledDemoComponent,
        ),
      title: 'Disabled button',
      description: 'Add the native "disabled" attribute.',
    },
    {
      path: 'button/group',
      load: () =>
        import('./examples/button/group.component').then(
          (m) => m.ButtonGroupDemoComponent,
        ),
      title: 'Grouping buttons',
      description:
        'Wrap buttons, and any links, in "ngx-govuk-button-group" to lay them out together.',
    },
  ],
  'character-count': [
    {
      path: 'character-count/default',
      load: () =>
        import('./examples/character-count/default.component').then(
          (m) => m.CharacterCountDemoComponent,
        ),
    },
    {
      path: 'character-count/words',
      load: () =>
        import('./examples/character-count/words.component').then(
          (m) => m.CharacterCountWordsDemoComponent,
        ),
      title: 'Word count',
      description:
        'Set "countType" to "words" to count words, and "maxLength" to the most words users should enter.',
    },
  ],
  checkboxes: [
    {
      path: 'checkboxes/default',
      load: () =>
        import('./examples/checkboxes/default.component').then(
          (m) => m.CheckboxesDemoComponent,
        ),
    },
    {
      path: 'checkboxes/conditional',
      load: () =>
        import('./examples/checkboxes/conditional.component').then(
          (m) => m.CheckboxesConditionalDemoComponent,
        ),
      title: 'Conditionally revealing a related question',
      description:
        'Add content inside "ngx-govuk-checkbox" with "*ngxGovukCheckboxConditional" to show it only while that checkbox is checked.',
    },
  ],
  'cookie-banner': [
    {
      path: 'cookie-banner/default',
      load: () =>
        import('./examples/cookie-banner/default.component').then(
          (m) => m.CookieBannerDemoComponent,
        ),
    },
  ],
  'date-input': [
    {
      path: 'date-input/default',
      load: () =>
        import('./examples/date-input/default.component').then(
          (m) => m.DateInputDemoComponent,
        ),
    },
  ],
  details: [
    {
      path: 'details/default',
      load: () =>
        import('./examples/details/default.component').then(
          (m) => m.DetailsDemoComponent,
        ),
    },
  ],
  'error-message': [
    {
      path: 'error-message/default',
      load: () =>
        import('./examples/error-message/default.component').then(
          (m) => m.ErrorMessageDemoComponent,
        ),
    },
  ],
  'error-summary': [
    {
      path: 'error-summary/default',
      load: () =>
        import('./examples/error-summary/default.component').then(
          (m) => m.ErrorSummaryDemoComponent,
        ),
    },
  ],
  'exit-this-page': [
    {
      path: 'exit-this-page/default',
      load: () =>
        import('./examples/exit-this-page/default.component').then(
          (m) => m.ExitThisPageDemoComponent,
        ),
    },
    {
      path: 'exit-this-page/skip-link',
      load: () =>
        import('./examples/exit-this-page/skip-link.component').then(
          (m) => m.ExitThisPageSkipLinkDemoComponent,
        ),
      title: 'Exit this page skip link',
      description:
        'Add "ngxGovukExitThisPageSkipLink" to a link at the top of the page, before the skip to main content link. It shows when users tab to it.',
    },
  ],
  feedback: [
    {
      path: 'feedback/default',
      load: () =>
        import('./examples/feedback/default.component').then(
          (m) => m.FeedbackDemoComponent,
        ),
    },
  ],
  fieldset: [
    {
      path: 'fieldset/default',
      load: () =>
        import('./examples/fieldset/default.component').then(
          (m) => m.FieldsetDemoComponent,
        ),
    },
  ],
  'file-upload': [
    {
      path: 'file-upload/default',
      load: () =>
        import('./examples/file-upload/default.component').then(
          (m) => m.FileUploadDemoComponent,
        ),
    },
    {
      path: 'file-upload/enhanced',
      load: () =>
        import('./examples/file-upload/enhanced.component').then(
          (m) => m.FileUploadEnhancedDemoComponent,
        ),
      title: 'Enhanced file upload',
      description:
        'Put the input inside "ngx-govuk-enhanced-file-upload" for a button that shows the chosen file, and that users can drop files onto.',
    },
  ],
  footer: [
    {
      path: 'footer/default',
      load: () =>
        import('./examples/footer/default.component').then(
          (m) => m.FooterDemoComponent,
        ),
    },
  ],
  'generic-header': [
    {
      path: 'generic-header/default',
      load: () =>
        import('./examples/generic-header/default.component').then(
          (m) => m.GenericHeaderDemoComponent,
        ),
    },
  ],
  header: [
    {
      path: 'header/default',
      load: () =>
        import('./examples/header/default.component').then(
          (m) => m.HeaderDemoComponent,
        ),
    },
  ],
  'inset-text': [
    {
      path: 'inset-text/default',
      load: () =>
        import('./examples/inset-text/default.component').then(
          (m) => m.InsetTextDemoComponent,
        ),
    },
  ],
  'language-navigation': [
    {
      path: 'language-navigation/default',
      load: () =>
        import('./examples/language-navigation/default.component').then(
          (m) => m.LanguageNavigationDemoComponent,
        ),
    },
  ],
  'notification-banner': [
    {
      path: 'notification-banner/default',
      load: () =>
        import('./examples/notification-banner/default.component').then(
          (m) => m.NotificationBannerDemoComponent,
        ),
    },
  ],
  pagination: [
    {
      path: 'pagination/default',
      load: () =>
        import('./examples/pagination/default.component').then(
          (m) => m.PaginationDemoComponent,
        ),
    },
    {
      path: 'pagination/block',
      load: () =>
        import('./examples/pagination/block.component').then(
          (m) => m.PaginationBlockDemoComponent,
        ),
      title: 'Block pagination',
      description:
        'Leave "totalPages" unset, and set "previous" and "next" to the links, each with an optional "labelText".',
    },
  ],
  panel: [
    {
      path: 'panel/default',
      load: () =>
        import('./examples/panel/default.component').then(
          (m) => m.PanelDemoComponent,
        ),
    },
  ],
  'password-input': [
    {
      path: 'password-input/default',
      load: () =>
        import('./examples/password-input/default.component').then(
          (m) => m.PasswordInputDemoComponent,
        ),
    },
  ],
  'phase-banner': [
    {
      path: 'phase-banner/default',
      load: () =>
        import('./examples/phase-banner/default.component').then(
          (m) => m.PhaseBannerDemoComponent,
        ),
    },
  ],
  radios: [
    {
      path: 'radios/default',
      load: () =>
        import('./examples/radios/default.component').then(
          (m) => m.RadiosDemoComponent,
        ),
    },
    {
      path: 'radios/conditional',
      load: () =>
        import('./examples/radios/conditional.component').then(
          (m) => m.RadiosConditionalDemoComponent,
        ),
      title: 'Conditionally revealing a related question',
      description:
        'Add content inside "ngx-govuk-radio" with "*ngxGovukRadioConditional" to show it only while that option is selected.',
    },
  ],
  select: [
    {
      path: 'select/default',
      load: () =>
        import('./examples/select/default.component').then(
          (m) => m.SelectDemoComponent,
        ),
    },
  ],
  'service-navigation': [
    {
      path: 'service-navigation/default',
      load: () =>
        import('./examples/service-navigation/default.component').then(
          (m) => m.ServiceNavigationDemoComponent,
        ),
    },
  ],
  'skip-link': [
    {
      path: 'skip-link/default',
      load: () =>
        import('./examples/skip-link/default.component').then(
          (m) => m.SkipLinkDemoComponent,
        ),
    },
  ],
  'summary-list': [
    {
      path: 'summary-list/default',
      load: () =>
        import('./examples/summary-list/default.component').then(
          (m) => m.SummaryListDemoComponent,
        ),
    },
    {
      path: 'summary-list/card',
      load: () =>
        import('./examples/summary-list/card.component').then(
          (m) => m.SummaryListCardDemoComponent,
        ),
      title: 'Summary card',
      description:
        'Put the list inside "ngx-govuk-summary-card" and set its "titleText". Add actions for the whole card with "*ngxGovukSummaryCardAction".',
    },
  ],
  table: [
    {
      path: 'table/default',
      load: () =>
        import('./examples/table/default.component').then(
          (m) => m.TableDemoComponent,
        ),
    },
  ],
  tabs: [
    {
      path: 'tabs/default',
      load: () =>
        import('./examples/tabs/default.component').then(
          (m) => m.TabsDemoComponent,
        ),
    },
  ],
  tag: [
    {
      path: 'tag/default',
      load: () =>
        import('./examples/tag/default.component').then(
          (m) => m.TagDemoComponent,
        ),
    },
  ],
  'task-list': [
    {
      path: 'task-list/default',
      load: () =>
        import('./examples/task-list/default.component').then(
          (m) => m.TaskListDemoComponent,
        ),
    },
  ],
  'text-input': [
    {
      path: 'text-input/default',
      load: () =>
        import('./examples/text-input/default.component').then(
          (m) => m.TextInputDemoComponent,
        ),
    },
    {
      path: 'text-input/fixed-width',
      load: () =>
        import('./examples/text-input/fixed-width.component').then(
          (m) => m.TextInputFixedWidthDemoComponent,
        ),
      title: 'Fixed width inputs',
      description:
        'Set "inputWidth" to a number of characters: "30", "20", "10", "5", "4", "3" or "2".',
    },
    {
      path: 'text-input/fluid-width',
      load: () =>
        import('./examples/text-input/fluid-width.component').then(
          (m) => m.TextInputFluidWidthDemoComponent,
        ),
      title: 'Fluid width inputs',
      description:
        'Set "inputWidth" to a fraction of its container: "full", "three-quarters", "two-thirds", "one-half", "one-third" or "one-quarter".',
    },
  ],
  textarea: [
    {
      path: 'textarea/default',
      load: () =>
        import('./examples/textarea/default.component').then(
          (m) => m.TextareaDemoComponent,
        ),
    },
  ],
  'warning-text': [
    {
      path: 'warning-text/default',
      load: () =>
        import('./examples/warning-text/default.component').then(
          (m) => m.WarningTextDemoComponent,
        ),
    },
  ],
};
