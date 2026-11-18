# Changelog

## [0.7.0](https://github.com/tgreyuk/ngx-govuk/compare/v0.6.0...v0.7.0) (2026-11-18)


### ⚠ BREAKING CHANGES

* Update govuk-frontend to 6.6.0 or later.
* **table:** `captionSize` no longer takes `s`. Leave it unset
* **summary-list:** add `ngxGovukSummaryActionLink` to the `a` of every `*ngxGovukSummaryListAction` and `*ngxGovukSummaryCardAction`, and pass its visually hidden text as `visuallyHiddenText` instead of writing a `govuk-visually-hidden` span, for example `<a *ngxGovukSummaryListAction ngxGovukSummaryActionLink visuallyHiddenText="name" routerLink=".">Change</a>`. The link no longer needs `class="govuk-link"`.
* **error-summary:** In error summary items, replace `href: '#event-name'` with `fieldId: 'event-name'`. Rename the error summary's `description` input to `descriptionText`.
* **error-message:** the `errorMessage` input is removed from `ngx-govuk-form-group`, `ngx-govuk-radios`, `ngx-govuk-checkboxes`, `ngx-govuk-date-input`, `ngx-govuk-character-count` and `ngx-govuk-password-input`. Import `NgxGovukErrorMessage` from `ngx-govuk/error-message` and put the message inside the component instead. Replace `<ngx-govuk-form-group label="Full name" [errorMessage]="nameError()">` with `<ngx-govuk-form-group label="Full name">` containing `@if (nameError()) { <p ngxGovukErrorMessage>{{ nameError() }}</p> }`.
* these components no longer render a `div` inside their own element: the element itself carries GOV.UK's classes, such as `ngx-govuk-panel.govuk-panel`. Update any CSS or test selectors that targeted the inner element through the component's element, such as `ngx-govuk-panel > .govuk-panel`.
* **breadcrumbs:** replace `<ngx-govuk-breadcrumbs>…</ngx-govuk-breadcrumbs>` with `<nav ngxGovukBreadcrumbs>…</nav>`.
* **details:** replace `<ngx-govuk-details summaryText="…">…</ngx-govuk-details>` with `<details ngxGovukDetails summaryText="…">…</details>`.
* **date-input:** `DateInputValue` is now `NgxGovukDateInputValue` and `DateInputPart` is now `NgxGovukDateInputPart`. Rename them where you import them.
* **text-input:** the `InputWidth` type exported from `ngx-govuk` is now `NgxGovukInputWidth`. Rename it where you import it.
* **cookie-banner:** `ngxGovukCookieBannerMessage`'s `heading` input is now `headingText`. Rename `heading` to `headingText` where you set it.
* **button:** `NgxGovukButton` is now a component rather than a directive. Its selector, inputs and import are unchanged, but it can no longer be used in `hostDirectives`, or on an element that has another component on it.
* **breadcrumbs:** Write breadcrumbs links as `<a *ngxGovukBreadcrumbsItem>`, with a `*`, instead of `<a ngxGovukBreadcrumbsItem>`.
* **button, back-link:** Replace `[inversed]` with `[inverse]` on buttons and back links, or write the `inverse` attribute alone.

### Features

* **accordion:** add heading level and summary lines ([5e481c0](https://github.com/tgreyuk/ngx-govuk/commit/5e481c0ef229e50b7b5272a91f0f33e6ebb0fda3))
* add provideNgxGovuk() to set up the page ([785086c](https://github.com/tgreyuk/ngx-govuk/commit/785086c9b779a97441daea5d9e398855c0a4c6c5))
* **breadcrumbs:** add collapseOnMobile, inverse and labelText ([a35ab14](https://github.com/tgreyuk/ngx-govuk/commit/a35ab1431435b49c1e0205467998b0fcc07beff2))
* **breadcrumbs:** add the breadcrumbs component to a native nav element ([6a7b018](https://github.com/tgreyuk/ngx-govuk/commit/6a7b0182b5346cb7e0f0ff9c1bcc6b7e60b63feb))
* **button:** add preventDoubleClick ([13e4dde](https://github.com/tgreyuk/ngx-govuk/commit/13e4dde122bc54ccc185672b8ede4069c88ecda0))
* **character-count:** add inputs for the count messages and their classes ([5c3138c](https://github.com/tgreyuk/ngx-govuk/commit/5c3138c495b91fa02e8e1069d9f7a60db55799fc))
* **checkboxes:** add a value input for the checkbox's value attribute ([cf855b7](https://github.com/tgreyuk/ngx-govuk/commit/cf855b700c5de8f5ed6e2708f52d7eb569673aa5))
* **date-input:** ask for only some parts of the date, and translate the labels ([12739e9](https://github.com/tgreyuk/ngx-govuk/commit/12739e9e542df411c058ad89f2a9eeaf585c06f7))
* **details:** add the details component to a native details element ([cf9fd08](https://github.com/tgreyuk/ngx-govuk/commit/cf9fd08c00cd9715abfb2f1065f5bedfbb5ef766))
* **error-message:** add the error message and project it into fields ([ef206ef](https://github.com/tgreyuk/ngx-govuk/commit/ef206ef78bc05a6040d2d1761eb6897cfdcd351b))
* **error-summary:** link errors by field id and allow a projected description ([4f3561d](https://github.com/tgreyuk/ngx-govuk/commit/4f3561d61572fb420c91afc869e2f47de353e182))
* **error-summary:** link errors to fields by their form control ([b26e3cf](https://github.com/tgreyuk/ngx-govuk/commit/b26e3cf239ee65fd59068bbc3c37b9141c24fbfb))
* **fieldset:** add describedBy and role ([66a4f4c](https://github.com/tgreyuk/ngx-govuk/commit/66a4f4c08dc41cf7190f982fef9cd20c3c923ee1))
* **footer:** set the language of a footer link with lang and hreflang ([9de487c](https://github.com/tgreyuk/ngx-govuk/commit/9de487cd54b0e9d6e22937ccd737d277028d7253))
* **generic-header:** add homepageUrl for a homepage outside your app ([bdff49e](https://github.com/tgreyuk/ngx-govuk/commit/bdff49ed2a36f1aa541430c2adc8b58b62690a67))
* let true/false inputs be set as a bare attribute ([e3c891c](https://github.com/tgreyuk/ngx-govuk/commit/e3c891c6b11741bdaccfb056b5a995ee74f90aeb))
* **notification-banner:** add a role option ([d65c36c](https://github.com/tgreyuk/ngx-govuk/commit/d65c36c673d6b66dd393d04a894020cd53fdd3a2))
* **notification-banner:** add heading and link directives ([3cad7e5](https://github.com/tgreyuk/ngx-govuk/commit/3cad7e5c6333f44f1b8197b9aeb69172b9881129))
* **pagination:** add text options, and accept page numbers as strings ([73cf1c6](https://github.com/tgreyuk/ngx-govuk/commit/73cf1c65576c95b03aad834b88da943c9783962d))
* **password-input:** add text options for other languages ([082352c](https://github.com/tgreyuk/ngx-govuk/commit/082352c6b85081c4b8be856bbc5bf7f911329d26))
* **phase-banner:** add a tag colour option ([21459da](https://github.com/tgreyuk/ngx-govuk/commit/21459da4dc1582c0859922c6840cc7c734ecad09))
* **service-navigation:** add links outside the app, current and active items, inverse and slots ([5c0a9ec](https://github.com/tgreyuk/ngx-govuk/commit/5c0a9ec32cd81cb2cc02064b5969efdbe8c64406))
* **table:** add `smallTextUntilTablet` for tables with a lot of data ([3dda6c2](https://github.com/tgreyuk/ngx-govuk/commit/3dda6c2ba33995f3156790d4f6f8e7c3e0a6b0bb))
* **tabs:** add routed tabs, with a `link` on each tab ([2f4b6ed](https://github.com/tgreyuk/ngx-govuk/commit/2f4b6eda2a479cd419008b38f1d9221896f28d6f))
* **text-input:** add extraLetterSpacing for codes and sequences ([3877588](https://github.com/tgreyuk/ngx-govuk/commit/3877588ddf468f16077f4e6c4df228312f5ba66f))


### Bug Fixes

* **accordion:** let find in page open closed sections ([55f0fed](https://github.com/tgreyuk/ngx-govuk/commit/55f0fed4aa8aa87041cf7274f9308e121aeccf98))
* **breadcrumbs:** render each item's list item from a template ([90f21a7](https://github.com/tgreyuk/ngx-govuk/commit/90f21a7223cd33b06713403b4cadd7a94dc2b8bc))
* **button, back-link:** rename inversed to inverse ([49d36ee](https://github.com/tgreyuk/ngx-govuk/commit/49d36ee1346cc22c3a72d6c8c01efa9e4fe4ace9))
* **button:** render the start icon from a template, and match GOV.UK's link and disabled markup ([7f87210](https://github.com/tgreyuk/ngx-govuk/commit/7f87210b23788b79431bc64ca3f744a46e6ecc73))
* **character-count:** count values set without an input event, and remove maxlength ([0611b2c](https://github.com/tgreyuk/ngx-govuk/commit/0611b2cd02f80fb384bf54bf3e4bc84c7ab33dc0))
* **character-count:** export the NgxGovukPluralText type ([5e10b77](https://github.com/tgreyuk/ngx-govuk/commit/5e10b77a856e71503fb8cfd69ae6aec6452878ec))
* **checkboxes:** count a divider when numbering the ids, and trim the item hint ([db4ae50](https://github.com/tgreyuk/ngx-govuk/commit/db4ae504e465b4e14dece5e7531bbaeb12a13fbe))
* connect a field that is rendered after its form group ([e50446a](https://github.com/tgreyuk/ngx-govuk/commit/e50446a54ab2a54e4e4095813a24db7b6a8007ac))
* **cookie-banner:** move focus to a confirmation when it's shown ([0092802](https://github.com/tgreyuk/ngx-govuk/commit/0092802e2e2918909683ce6dc8bcfd120a8f7873))
* **cookie-banner:** rename the message's heading input to headingText ([e64e077](https://github.com/tgreyuk/ngx-govuk/commit/e64e0776ca48771ad2a0d97e6fa74fa44c663d32))
* **date-input:** mark the form control touched only when focus leaves the date ([a2dd124](https://github.com/tgreyuk/ngx-govuk/commit/a2dd1242a2bf54a76c9f9191ebd71c552e6f399a))
* **date-input:** prefix the date input's types, and describe its value ([34fdd39](https://github.com/tgreyuk/ngx-govuk/commit/34fdd39c5070014b9a3cd8bd75f4a6f6c6f408b7))
* display pagination and the navigations as blocks ([128b3a9](https://github.com/tgreyuk/ngx-govuk/commit/128b3a94535ba820b27b7c8ea505fcd81a0817a3))
* **exit-this-page:** handle an empty redirectUrl and more than one button ([4ba15a8](https://github.com/tgreyuk/ngx-govuk/commit/4ba15a846b5b68582450bbb52029f9a66f8798f1))
* **file-upload:** make the enhanced file upload GOV.UK's wrapper ([6d8eee1](https://github.com/tgreyuk/ngx-govuk/commit/6d8eee1e3665b68c35848cf930f55a3ba5299515))
* **footer:** remove the spaces around section headings, leave out links with nowhere to go ([57ed8d1](https://github.com/tgreyuk/ngx-govuk/commit/57ed8d1381b2b04c00f1b1315c73f99a4ebac4cd))
* **form-group:** remove the spaces around prefix and suffix text ([0a0a287](https://github.com/tgreyuk/ngx-govuk/commit/0a0a287dce4fdb0afad67107e754a192d31b9e16))
* **header:** link the logo to GOV.UK when homepageUrl is empty ([cb9c5ee](https://github.com/tgreyuk/ngx-govuk/commit/cb9c5eea593e9e98674867b7a808a4c6ce7023ec))
* **language-navigation:** show a language without a link as current ([42420ab](https://github.com/tgreyuk/ngx-govuk/commit/42420ab67b328b57f6e7dfb775a9166a8385c90d))
* let GOV.UK's styles override components' block display ([2ecae94](https://github.com/tgreyuk/ngx-govuk/commit/2ecae946021a930fd793d5dd92667ec6d6ad5dd5))
* **pagination:** trim the link text in block pagination ([b732889](https://github.com/tgreyuk/ngx-govuk/commit/b732889d2cdab954ef72b4ab1268196182ebac79))
* **panel:** match GOV.UK's spacing and actions ([df637e8](https://github.com/tgreyuk/ngx-govuk/commit/df637e891a7a32e794cea663bc37ceb48df110b6))
* **password-input:** announce the password as hidden after submitting ([0b753b8](https://github.com/tgreyuk/ngx-govuk/commit/0b753b8f10c2ac5e3b7bb0c26e31846539d64ae9))
* **password-input:** trim the button text and status message ([409aa17](https://github.com/tgreyuk/ngx-govuk/commit/409aa17201661e6555ab3f86b8852693044b9749))
* **radios:** count a divider when numbering the option ids ([344357a](https://github.com/tgreyuk/ngx-govuk/commit/344357a8a19721c9138336b50b6369347453f10d))
* remove the spaces around legend text ([d733c31](https://github.com/tgreyuk/ngx-govuk/commit/d733c31220f336debfadf03e90b1d65536e159c1))
* render GOV.UK's root element as the component's own element ([2bfa942](https://github.com/tgreyuk/ngx-govuk/commit/2bfa9421e534ba7522853c2b717c4134c141a33e))
* require GOV.UK Frontend 6.6.0 or later ([7f4c977](https://github.com/tgreyuk/ngx-govuk/commit/7f4c97718e9de099a33efcad0a3b9f436fb88b63))
* **service-navigation:** remove the spaces around the menu button and link text ([b7aa746](https://github.com/tgreyuk/ngx-govuk/commit/b7aa7464280bc60840922805cd0d0873a3b541ba))
* **skip-link:** open the link elsewhere on a modified click, and tidy up when focus fails ([c8c426d](https://github.com/tgreyuk/ngx-govuk/commit/c8c426d71c51e64456aa419325cd64b1aab6fdc5))
* **summary-list:** add action links' hidden text and card title from a template ([9f6d1b7](https://github.com/tgreyuk/ngx-govuk/commit/9f6d1b772e80b643569f95ee1f2076c55016dd15))
* **table:** remove the caption's `s` size, which GOV.UK doesn't style ([c78fded](https://github.com/tgreyuk/ngx-govuk/commit/c78fdedabb1fc75e0b905e56ed354c29b544d741))
* **tabs:** follow GOV.UK Frontend's links, history and supported check ([af6f973](https://github.com/tgreyuk/ngx-govuk/commit/af6f973bdf8d6295acbfefec1ee8d1f68c9a86e7))
* **text-input:** export the NgxGovukInputWidth type ([84c1fd2](https://github.com/tgreyuk/ngx-govuk/commit/84c1fd2da46d60a602ecc3915dd768cf85c22f85))
* **text-input:** rename the InputWidth type to NgxGovukInputWidth ([a29ec07](https://github.com/tgreyuk/ngx-govuk/commit/a29ec07cda0206c8ba6453da55386d62d923e2dd))
* **warning-text:** add a space between the hidden text and the warning ([e333742](https://github.com/tgreyuk/ngx-govuk/commit/e3337421386026769a38d3a9d08e9637925e4e90))

## [0.6.0](https://github.com/tgreyuk/ngx-govuk/compare/v0.5.0...v0.6.0) (2026-11-14)


### ⚠ BREAKING CHANGES

* **tabs:** ngx-govuk-tabs-group is now ngx-govuk-tabs, and the classes NgxGovukTabsComponent and NgxGovukTabComponent are now NgxGovukTabs and NgxGovukTab. Set the open tab with selectedIndex on ngx-govuk-tabs instead of selected on each tab. ngx-govuk-tabs-nav and ngxGovukTabLink are removed; GOV.UK tabs are for content on one page, so use links or service navigation to move between pages.
* **character-count:** `limit` is now `maxLength` and is required. Put the `textarea` directly inside `ngx-govuk-character-count` and move the `label`, `hint` and `errorMessage` inputs to it, instead of wrapping an `ngx-govuk-form-group`.
* **date-input:** `NgxGovukDateInputComponent` is now `NgxGovukDateInput` and needs a `legend`. Its value is a `DateInputValue` object with `day`, `month` and `year` strings, not a `"day/month/year"` string.
* **checkboxes:** the `ngxGovukCheckboxes` directive is replaced by the `ngx-govuk-checkboxes` component, which needs a `legend`. `NgxGovukCheckboxComponent` is now `NgxGovukCheckbox`: put its label in its content instead of the `label` input, and bind `checked` instead of `value`.
* **fieldset:** `NgxGovukFieldsetComponent` is now `NgxGovukFieldset`, and its `hint` input is removed. For a question with radios or checkboxes, use `ngx-govuk-radios` or `ngx-govuk-checkboxes`, which add their own fieldset, hint and error message.

### Features

* Adds every remaining GOV.UK Frontend 6.6 component:
  * **Navigation and layout:** header, generic header, service navigation, footer, skip link, phase banner, language navigation, pagination and exit this page
  * **Content:** inset text, warning text, tag, panel, notification banner, table, summary list and summary cards, task list, cookie banner and feedback
  * **Forms:** radios, select, password input, file upload, enhanced file upload and error summary
* **radios, checkboxes:** add conditional reveal and a divider, and a "none" option for checkboxes
* **character-count:** count words or characters, match GOV.UK's count and let users go over the limit
* **tabs, date-input, fieldset, checkboxes:** rework to follow GOV.UK Frontend (see breaking changes)

## [0.5.0](https://github.com/tgreyuk/ngx-govuk/compare/v0.4.0...v0.5.0) (2026-11-13)


### ⚠ BREAKING CHANGES

* **accordion:** NgxGovukAccordionPanel's `isExpanded` signal is replaced by the `expanded` model, and its toggle() is no longer public: set `expanded` instead. NgxGovukAccordion's `isExpanded` signal is removed, and `panels` is no longer public.
* **character-count:** NgxGovUkCharacterCount is renamed NgxGovukCharacterCount. Update your imports.
* **form-group:** the form group no longer shows errors from the control's validity. Pass errorMessage when your validation fails, for example [errorMessage]="control.invalid && submitted ? 'Enter ...' : null". The text input and textarea directives no longer expose `control`.
* ngx-govuk/forms is removed. Import from ngx-govuk/checkboxes, ngx-govuk/fieldset or ngx-govuk/date-input.
* ngx-govuk now requires Angular 22 (`@angular/core` ^22.0.0 and the matching common, forms and router).

### Features

* **accordion:** control panels with an `expanded` model ([f074712](https://github.com/tgreyuk/ngx-govuk/commit/f074712c9531f94d264a5633bc219e3371a73163))
* **form-group:** match GOV.UK's field wiring and keep the field's own id ([160072c](https://github.com/tgreyuk/ngx-govuk/commit/160072c353445e89125c4d581a2c51d2acb5323b))
* split ngx-govuk/forms into checkboxes, fieldset and date-input ([d5eb827](https://github.com/tgreyuk/ngx-govuk/commit/d5eb827f1584d9b5a665d3c3e064fffa69e8af54))
* upgrade to Angular 22 ([c4de1d5](https://github.com/tgreyuk/ngx-govuk/commit/c4de1d5e21f62f22789c38ed1aa182b9b55a984a))


### Bug Fixes

* **accordion:** include the heading in the section button's aria-label ([b80bf4b](https://github.com/tgreyuk/ngx-govuk/commit/b80bf4b603d225cc365b5c0a73f95dd5b1a143a8))
* **breadcrumbs:** render a nav landmark and style the links ([4626922](https://github.com/tgreyuk/ngx-govuk/commit/4626922fc867234873974e0fd9b45a5ac0b15258))
* **fieldset:** render the legend input and only show a hint when set ([e565ea4](https://github.com/tgreyuk/ngx-govuk/commit/e565ea4bbdca9356adf24730f587f558f54f0bd3))
* **form-group:** only wrap the control when there is a prefix or suffix ([8c5feef](https://github.com/tgreyuk/ngx-govuk/commit/8c5feefe21184a0c7dfa79048840d0373f8e7009))
* include the licence, description and keywords in the npm package ([a5dbcc4](https://github.com/tgreyuk/ngx-govuk/commit/a5dbcc43840ebe3a7ddf63a8bda941300a84914e))
* rename NgxGovUkCharacterCount to NgxGovukCharacterCount ([b20c15b](https://github.com/tgreyuk/ngx-govuk/commit/b20c15b6d202df7967972c6a1ea0269ccade7cc9))
* **textarea:** use govuk-textarea--error for the error state ([cdd981a](https://github.com/tgreyuk/ngx-govuk/commit/cdd981a5b65043749503e729afee6d11e5c23a0c))

## 0.4.0 (2024-03-01)


### 🚀 Features

- Added details component ([040da41](https://github.com/tgreyuk/ngx-govuk/commit/040da41))
- Added "Back link" component. ([f2451ee](https://github.com/tgreyuk/ngx-govuk/commit/f2451ee))
- Added "breadcrumbs" component ([d79b4aa](https://github.com/tgreyuk/ngx-govuk/commit/d79b4aa))

### ❤️  Thank You

- tgreyuk @tgreyuk

## 0.3.0 (2024-02-28)


### 🚀 Features

- Added button component ([058b267](https://github.com/tgreyuk/ngx-govuk/commit/058b267))

### ❤️  Thank You

- tgreyuk @tgreyuk
