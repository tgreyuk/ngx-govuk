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
  /**
   * Shows the demo's class under its template. Set it when the template
   * uses members of the class, such as signals or methods.
   */
  showComponentCode?: boolean;
  /**
   * Adds a button that puts the demo back in its first state. Set it when
   * the demo can end up empty, such as a cookie banner once it is hidden.
   */
  resettable?: boolean;
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
    {
      path: 'accordion/summary',
      load: () =>
        import('./examples/accordion/summary.component').then(
          (m) => m.AccordionSummaryDemoComponent,
        ),
      title: 'Summary lines',
      description:
        'Set "summary" on each panel to add a line under its heading.',
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
      description: 'Add the "disabled" attribute.',
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
    {
      path: 'button/prevent-double-click',
      load: () =>
        import('./examples/button/prevent-double-click.component').then(
          (m) => m.ButtonPreventDoubleClickDemoComponent,
        ),
      title: 'Stop users submitting twice',
      description:
        'Set "preventDoubleClick" to ignore a second click within 1 second.',
    },
  ],
  'character-count': [
    {
      path: 'character-count/more-detail',
      load: () =>
        import('./examples/character-count/more-detail.component').then(
          (m) => m.MoreDetailComponent,
        ),
      showComponentCode: true,
    },
    {
      path: 'character-count/job-description',
      load: () =>
        import('./examples/character-count/job-description.component').then(
          (m) => m.JobDescriptionComponent,
        ),
      showComponentCode: true,
      title: 'Word count',
      description:
        'Set "countType" to "words" to count words, and "maxLength" to the most words users should enter.',
    },
  ],
  checkboxes: [
    {
      path: 'checkboxes/waste-types',
      load: () =>
        import('./examples/checkboxes/waste-types.component').then(
          (m) => m.WasteTypesComponent,
        ),
      showComponentCode: true,
    },
    {
      path: 'checkboxes/contact-methods',
      load: () =>
        import('./examples/checkboxes/contact-methods.component').then(
          (m) => m.ContactMethodsComponent,
        ),
      showComponentCode: true,
      title: 'Conditionally revealing a related question',
      description:
        'Add content inside "ngx-govuk-checkbox" with "*ngxGovukCheckboxConditional" to show it only while that checkbox is checked.',
    },
    {
      path: 'checkboxes/travel-countries',
      load: () =>
        import('./examples/checkboxes/travel-countries.component').then(
          (m) => m.TravelCountriesComponent,
        ),
      showComponentCode: true,
      title: 'Add an option for "none"',
      description:
        'Add "exclusive" to the last checkbox, after a "div" with "ngxGovukCheckboxesDivider". Checking it unchecks the others, and checking another unchecks it.',
    },
  ],
  'cookie-banner': [
    {
      path: 'cookie-banner/cookie-banner',
      load: () =>
        import('./examples/cookie-banner/cookie-banner.component').then(
          (m) => m.CookieBannerComponent,
        ),
      showComponentCode: true,
      resettable: true,
    },
  ],
  'date-input': [
    {
      path: 'date-input/passport-issued',
      load: () =>
        import('./examples/date-input/passport-issued.component').then(
          (m) => m.PassportIssuedComponent,
        ),
      showComponentCode: true,
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
      path: 'error-message/passport-issued',
      load: () =>
        import('./examples/error-message/passport-issued.component').then(
          (m) => m.PassportIssuedComponent,
        ),
      showComponentCode: true,
    },
    {
      path: 'error-message/full-name',
      load: () =>
        import('./examples/error-message/full-name.component').then(
          (m) => m.FullNameComponent,
        ),
      showComponentCode: true,
      title: 'Custom prefix',
      description:
        'Set "visuallyHiddenText" to change the hidden "Error" before the message, such as to "Gwall" in Welsh.',
    },
  ],
  'error-summary': [
    {
      path: 'error-summary/error-summary',
      load: () =>
        import('./examples/error-summary/error-summary.component').then(
          (m) => m.ErrorSummaryComponent,
        ),
      showComponentCode: true,
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
  'form-group': [
    {
      path: 'form-group/cost-form',
      load: () =>
        import('./examples/form-group/cost-form.component').then(
          (m) => m.CostFormComponent,
        ),
      showComponentCode: true,
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
      path: 'password-input/password',
      load: () =>
        import('./examples/password-input/password.component').then(
          (m) => m.PasswordComponent,
        ),
      showComponentCode: true,
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
      path: 'radios/where-do-you-live',
      load: () =>
        import('./examples/radios/where-do-you-live.component').then(
          (m) => m.WhereDoYouLiveComponent,
        ),
      showComponentCode: true,
    },
    {
      path: 'radios/contact-preference',
      load: () =>
        import('./examples/radios/contact-preference.component').then(
          (m) => m.ContactPreferenceComponent,
        ),
      showComponentCode: true,
      title: 'Conditionally revealing a related question',
      description:
        'Add content inside "ngx-govuk-radio" with "*ngxGovukRadioConditional" to show it only while that option is selected.',
    },
    {
      path: 'radios/where-do-you-live-or-abroad',
      load: () =>
        import('./examples/radios/where-do-you-live-or-abroad.component').then(
          (m) => m.WhereDoYouLiveOrAbroadComponent,
        ),
      showComponentCode: true,
      title: 'Radio items with a text divider',
      description:
        'Put a "div" with "ngxGovukRadiosDivider" before the last option to set it apart.',
    },
  ],
  select: [
    {
      path: 'select/sort-by',
      load: () =>
        import('./examples/select/sort-by.component').then(
          (m) => m.SortByComponent,
        ),
      showComponentCode: true,
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
      path: 'text-input/event-name',
      load: () =>
        import('./examples/text-input/event-name.component').then(
          (m) => m.EventNameComponent,
        ),
      showComponentCode: true,
    },
    {
      path: 'text-input/fixed-width-inputs',
      load: () =>
        import('./examples/text-input/fixed-width-inputs.component').then(
          (m) => m.FixedWidthInputsComponent,
        ),
      showComponentCode: true,
      title: 'Fixed width inputs',
      description:
        'Set "inputWidth" to a number of characters: "30", "20", "10", "5", "4", "3" or "2".',
    },
    {
      path: 'text-input/fluid-width-inputs',
      load: () =>
        import('./examples/text-input/fluid-width-inputs.component').then(
          (m) => m.FluidWidthInputsComponent,
        ),
      showComponentCode: true,
      title: 'Fluid width inputs',
      description:
        'Set "inputWidth" to a fraction of its container: "full", "three-quarters", "two-thirds", "one-half", "one-third" or "one-quarter".',
    },
  ],
  textarea: [
    {
      path: 'textarea/more-detail',
      load: () =>
        import('./examples/textarea/more-detail.component').then(
          (m) => m.MoreDetailComponent,
        ),
      showComponentCode: true,
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
