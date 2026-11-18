# Changelog

## [0.7.0](https://github.com/tgreyuk/ngx-govuk/compare/v0.6.0...v0.7.0) (2026-11-18)


### ⚠ BREAKING CHANGES

* Require govuk-frontend 6.6.0 or later.
* Components render GOV.UK's root element as their own element, not a `div` inside it. Update selectors such as `ngx-govuk-panel > .govuk-panel`.
* **back-link:** Rename `inversed` to `inverse`.
* **breadcrumbs:** Use `<nav ngxGovukBreadcrumbs>`, with `<a *ngxGovukBreadcrumbsItem>` links.
* **button:** Rename `inversed` to `inverse`. The button is now a component, so it can't be used in `hostDirectives`.
* **cookie-banner:** Rename the message's `heading` to `headingText`.
* **date-input:** Rename `DateInputValue` and `DateInputPart` to `NgxGovukDateInputValue` and `NgxGovukDateInputPart`.
* **details:** Use `<details ngxGovukDetails>`.
* **error-message:** Put a `p ngxGovukErrorMessage` inside a field instead of setting `errorMessage`.
* **error-summary:** Link errors with `fieldId` instead of `href`, and rename `description` to `descriptionText`.
* **summary-list:** Add `ngxGovukSummaryActionLink` to action links, with `visuallyHiddenText`.
* **table:** `captionSize` no longer takes `s`.
* **text-input:** Rename `InputWidth` to `NgxGovukInputWidth`.

### Features

* add `provideNgxGovuk()` to set up the page ([785086c](https://github.com/tgreyuk/ngx-govuk/commit/785086c9b779a97441daea5d9e398855c0a4c6c5))
* let true/false inputs be set as a bare attribute ([e3c891c](https://github.com/tgreyuk/ngx-govuk/commit/e3c891c6b11741bdaccfb056b5a995ee74f90aeb))
* add text options for other languages to the character count, date input, pagination and password input ([5c3138c](https://github.com/tgreyuk/ngx-govuk/commit/5c3138c495b91fa02e8e1069d9f7a60db55799fc), [12739e9](https://github.com/tgreyuk/ngx-govuk/commit/12739e9e542df411c058ad89f2a9eeaf585c06f7), [73cf1c6](https://github.com/tgreyuk/ngx-govuk/commit/73cf1c65576c95b03aad834b88da943c9783962d), [082352c](https://github.com/tgreyuk/ngx-govuk/commit/082352c6b85081c4b8be856bbc5bf7f911329d26))
* add more options to the checkboxes, fieldset, footer, generic header, phase banner, table and text input ([cf855b7](https://github.com/tgreyuk/ngx-govuk/commit/cf855b700c5de8f5ed6e2708f52d7eb569673aa5), [66a4f4c](https://github.com/tgreyuk/ngx-govuk/commit/66a4f4c08dc41cf7190f982fef9cd20c3c923ee1), [9de487c](https://github.com/tgreyuk/ngx-govuk/commit/9de487cd54b0e9d6e22937ccd737d277028d7253), [bdff49e](https://github.com/tgreyuk/ngx-govuk/commit/bdff49ed2a36f1aa541430c2adc8b58b62690a67), [21459da](https://github.com/tgreyuk/ngx-govuk/commit/21459da4dc1582c0859922c6840cc7c734ecad09), [3dda6c2](https://github.com/tgreyuk/ngx-govuk/commit/3dda6c2ba33995f3156790d4f6f8e7c3e0a6b0bb), [3877588](https://github.com/tgreyuk/ngx-govuk/commit/3877588ddf468f16077f4e6c4df228312f5ba66f))
* **accordion:** add heading level and summary lines ([5e481c0](https://github.com/tgreyuk/ngx-govuk/commit/5e481c0ef229e50b7b5272a91f0f33e6ebb0fda3))
* **breadcrumbs:** add `collapseOnMobile`, `inverse` and `labelText` ([6a7b018](https://github.com/tgreyuk/ngx-govuk/commit/6a7b0182b5346cb7e0f0ff9c1bcc6b7e60b63feb), [a35ab14](https://github.com/tgreyuk/ngx-govuk/commit/a35ab1431435b49c1e0205467998b0fcc07beff2))
* **button:** add `preventDoubleClick` ([13e4dde](https://github.com/tgreyuk/ngx-govuk/commit/13e4dde122bc54ccc185672b8ede4069c88ecda0))
* **details:** use a native `details` element ([cf9fd08](https://github.com/tgreyuk/ngx-govuk/commit/cf9fd08c00cd9715abfb2f1065f5bedfbb5ef766))
* **error-message:** add the error message as its own component ([ef206ef](https://github.com/tgreyuk/ngx-govuk/commit/ef206ef78bc05a6040d2d1761eb6897cfdcd351b))
* **error-summary:** link errors to fields by form control or id ([b26e3cf](https://github.com/tgreyuk/ngx-govuk/commit/b26e3cf239ee65fd59068bbc3c37b9141c24fbfb), [4f3561d](https://github.com/tgreyuk/ngx-govuk/commit/4f3561d61572fb420c91afc869e2f47de353e182))
* **notification-banner:** add a `role` option, and heading and link directives ([d65c36c](https://github.com/tgreyuk/ngx-govuk/commit/d65c36c673d6b66dd393d04a894020cd53fdd3a2), [3cad7e5](https://github.com/tgreyuk/ngx-govuk/commit/3cad7e5c6333f44f1b8197b9aeb69172b9881129))
* **service-navigation:** add external links, current and active items, `inverse` and slots ([5c0a9ec](https://github.com/tgreyuk/ngx-govuk/commit/5c0a9ec32cd81cb2cc02064b5969efdbe8c64406))
* **tabs:** add routed tabs ([2f4b6ed](https://github.com/tgreyuk/ngx-govuk/commit/2f4b6eda2a479cd419008b38f1d9221896f28d6f))

### Bug Fixes

* match GOV.UK Frontend 6.6.0's markup, spacing and behaviour across components ([d733c31](https://github.com/tgreyuk/ngx-govuk/commit/d733c31220f336debfadf03e90b1d65536e159c1), [0a0a287](https://github.com/tgreyuk/ngx-govuk/commit/0a0a287dce4fdb0afad67107e754a192d31b9e16), [57ed8d1](https://github.com/tgreyuk/ngx-govuk/commit/57ed8d1381b2b04c00f1b1315c73f99a4ebac4cd), [b732889](https://github.com/tgreyuk/ngx-govuk/commit/b732889d2cdab954ef72b4ab1268196182ebac79), [409aa17](https://github.com/tgreyuk/ngx-govuk/commit/409aa17201661e6555ab3f86b8852693044b9749), [b7aa746](https://github.com/tgreyuk/ngx-govuk/commit/b7aa7464280bc60840922805cd0d0873a3b541ba), [e333742](https://github.com/tgreyuk/ngx-govuk/commit/e3337421386026769a38d3a9d08e9637925e4e90), [128b3a9](https://github.com/tgreyuk/ngx-govuk/commit/128b3a94535ba820b27b7c8ea505fcd81a0817a3), [2ecae94](https://github.com/tgreyuk/ngx-govuk/commit/2ecae946021a930fd793d5dd92667ec6d6ad5dd5), [df637e8](https://github.com/tgreyuk/ngx-govuk/commit/df637e891a7a32e794cea663bc37ceb48df110b6), [6d8eee1](https://github.com/tgreyuk/ngx-govuk/commit/6d8eee1e3665b68c35848cf930f55a3ba5299515), [af6f973](https://github.com/tgreyuk/ngx-govuk/commit/af6f973bdf8d6295acbfefec1ee8d1f68c9a86e7))
* connect a field that is rendered after its form group ([e50446a](https://github.com/tgreyuk/ngx-govuk/commit/e50446a54ab2a54e4e4095813a24db7b6a8007ac))
* **accordion:** let find in page open closed sections ([55f0fed](https://github.com/tgreyuk/ngx-govuk/commit/55f0fed4aa8aa87041cf7274f9308e121aeccf98))
* **character-count:** count values set without an input event ([0611b2c](https://github.com/tgreyuk/ngx-govuk/commit/0611b2cd02f80fb384bf54bf3e4bc84c7ab33dc0), [5e10b77](https://github.com/tgreyuk/ngx-govuk/commit/5e10b77a856e71503fb8cfd69ae6aec6452878ec))
* **checkboxes, radios:** count a divider when numbering ids ([db4ae50](https://github.com/tgreyuk/ngx-govuk/commit/db4ae504e465b4e14dece5e7531bbaeb12a13fbe), [344357a](https://github.com/tgreyuk/ngx-govuk/commit/344357a8a19721c9138336b50b6369347453f10d))
* **cookie-banner:** move focus to a confirmation when it's shown ([0092802](https://github.com/tgreyuk/ngx-govuk/commit/0092802e2e2918909683ce6dc8bcfd120a8f7873))
* **date-input:** mark the control touched only when focus leaves the date ([a2dd124](https://github.com/tgreyuk/ngx-govuk/commit/a2dd1242a2bf54a76c9f9191ebd71c552e6f399a))
* **exit-this-page:** handle an empty `redirectUrl` and more than one button ([4ba15a8](https://github.com/tgreyuk/ngx-govuk/commit/4ba15a846b5b68582450bbb52029f9a66f8798f1))
* **header:** link the logo to GOV.UK when `homepageUrl` is empty ([cb9c5ee](https://github.com/tgreyuk/ngx-govuk/commit/cb9c5eea593e9e98674867b7a808a4c6ce7023ec))
* **language-navigation:** show a language without a link as current ([42420ab](https://github.com/tgreyuk/ngx-govuk/commit/42420ab67b328b57f6e7dfb775a9166a8385c90d))
* **password-input:** announce the password as hidden after submitting ([0b753b8](https://github.com/tgreyuk/ngx-govuk/commit/0b753b8f10c2ac5e3b7bb0c26e31846539d64ae9))
* **skip-link:** open the link elsewhere on a modified click ([c8c426d](https://github.com/tgreyuk/ngx-govuk/commit/c8c426d71c51e64456aa419325cd64b1aab6fdc5))

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
