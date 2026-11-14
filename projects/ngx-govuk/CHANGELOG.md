# Changelog

## [0.6.0](https://github.com/tgreyuk/ngx-govuk/compare/v0.5.0...v0.6.0) (2026-11-14)


### ⚠ BREAKING CHANGES

* **tabs:** ngx-govuk-tabs-group is now ngx-govuk-tabs, and the classes NgxGovukTabsComponent and NgxGovukTabComponent are now NgxGovukTabs and NgxGovukTab. Set the open tab with selectedIndex on ngx-govuk-tabs instead of selected on each tab. ngx-govuk-tabs-nav and ngxGovukTabLink are removed; GOV.UK tabs are for content on one page, so use links or service navigation to move between pages.
* **character-count:** `limit` is now `maxLength` and is required. Put the `textarea` directly inside `ngx-govuk-character-count` and move the `label`, `hint` and `errorMessage` inputs to it, instead of wrapping an `ngx-govuk-form-group`.
* **date-input:** `NgxGovukDateInputComponent` is now `NgxGovukDateInput` and needs a `legend`. Its value is a `DateInputValue` object with `day`, `month` and `year` strings, not a `"day/month/year"` string.
* **checkboxes:** the `ngxGovukCheckboxes` directive is replaced by the `ngx-govuk-checkboxes` component, which needs a `legend`. `NgxGovukCheckboxComponent` is now `NgxGovukCheckbox`: put its label in its content instead of the `label` input, and bind `checked` instead of `value`.
* **fieldset:** `NgxGovukFieldsetComponent` is now `NgxGovukFieldset`, and its `hint` input is removed. For a question with radios or checkboxes, use `ngx-govuk-radios` or `ngx-govuk-checkboxes`, which add their own fieldset, hint and error message.

### Features

* **character-count:** count words or characters ([b9e70dc](https://github.com/tgreyuk/ngx-govuk/commit/b9e70dc75a2998850a096191f908b518edd3b3f2))
* **character-count:** match GOV.UK's count and let users go over the limit ([02ade64](https://github.com/tgreyuk/ngx-govuk/commit/02ade6492e7d3b2ec5c76784273b6a7ec5795711))
* **checkboxes:** add a "none" option and divider ([e96d15f](https://github.com/tgreyuk/ngx-govuk/commit/e96d15f34f4da8da2ed07e3830e9f8b2e225af2b))
* **checkboxes:** add conditional reveal ([d5ae430](https://github.com/tgreyuk/ngx-govuk/commit/d5ae430a913ae84f7ff2bb1b3839b439a8d03093))
* **checkboxes:** add the fieldset, hint and error message to checkboxes ([2f851d8](https://github.com/tgreyuk/ngx-govuk/commit/2f851d819ffd48f69fe5214ca2b78555ce844072))
* **cookie-banner:** add cookie banner ([6176c0a](https://github.com/tgreyuk/ngx-govuk/commit/6176c0aee4373cf57acca4d47802c66f33fe5fbf))
* **date-input:** return the day, month and year separately ([d7abc50](https://github.com/tgreyuk/ngx-govuk/commit/d7abc5078cf47ffd5b5e81efd81c78a03614e048))
* **error-summary:** add error summary ([61e6ec1](https://github.com/tgreyuk/ngx-govuk/commit/61e6ec135352091d4c4d1154f23e4f91ee498105))
* **exit-this-page:** add exit this page ([ae76ac5](https://github.com/tgreyuk/ngx-govuk/commit/ae76ac557ccd64810ccf1333605e8bec28ac74f7))
* **exit-this-page:** add exit this page skip link ([2d77ccf](https://github.com/tgreyuk/ngx-govuk/commit/2d77ccf6b1783112a71d8f753e985b703bc8f826))
* **feedback:** add feedback ([4c098ed](https://github.com/tgreyuk/ngx-govuk/commit/4c098ed2cd9be98820e85e20a24df8dbd078c2bc))
* **fieldset:** render a plain GOV.UK fieldset with a sized legend ([a120c72](https://github.com/tgreyuk/ngx-govuk/commit/a120c72a555f37eef655576a9516d3668d78c9c0))
* **file-upload:** add enhanced file upload ([d61f77c](https://github.com/tgreyuk/ngx-govuk/commit/d61f77c9d18dc97626e72323342c235f935b2502))
* **file-upload:** add file upload ([e96836c](https://github.com/tgreyuk/ngx-govuk/commit/e96836c7126edcb53335e3a242f23969ac82fc5e))
* **footer:** add footer ([0df0799](https://github.com/tgreyuk/ngx-govuk/commit/0df0799e4b7f784ccfd4a541d517eb22c670a407))
* **generic-header:** add generic header ([87c0ab6](https://github.com/tgreyuk/ngx-govuk/commit/87c0ab697e32743f00c9623c6a8f97dc826f99cb))
* **header:** add header ([5677870](https://github.com/tgreyuk/ngx-govuk/commit/5677870430b45132893311d7b33abd5c1df52b3e))
* **inset-text:** add inset text ([bee2ce4](https://github.com/tgreyuk/ngx-govuk/commit/bee2ce4136475e8c6f4db98ec04b7dda4575bdda))
* **language-navigation:** add language navigation ([08d325d](https://github.com/tgreyuk/ngx-govuk/commit/08d325dd73f23bda79a4a285db5b52bbcbe40e08))
* **notification-banner:** add notification banner ([cd41b93](https://github.com/tgreyuk/ngx-govuk/commit/cd41b9348753de5ec05ff28da358ec395431b4b4))
* **pagination:** add pagination ([4226864](https://github.com/tgreyuk/ngx-govuk/commit/4226864c278bbc083de2fcec7b63f1f7f1d6e851))
* **panel:** add panel ([66cadf3](https://github.com/tgreyuk/ngx-govuk/commit/66cadf3b8752786a38bedd07d7ccb75b9d220888))
* **password-input:** add password input ([34f7721](https://github.com/tgreyuk/ngx-govuk/commit/34f7721a4aad8257d7d0f8c69b2440c53635cd18))
* **phase-banner:** add phase banner ([6a1cb63](https://github.com/tgreyuk/ngx-govuk/commit/6a1cb63c88db06190ab2a5305ed8581f80dcc6c8))
* **radios:** add a divider ([055b050](https://github.com/tgreyuk/ngx-govuk/commit/055b05088da46d11a59fc98661a398d71ea52b46))
* **radios:** add conditional reveal ([366cf26](https://github.com/tgreyuk/ngx-govuk/commit/366cf2665d9bd4765b7e497a60a5adcf079968fa))
* **radios:** add radios ([4098ad8](https://github.com/tgreyuk/ngx-govuk/commit/4098ad897a459312e8d5d2e20176c1a30643d4e0))
* **select:** add select ([9433eaf](https://github.com/tgreyuk/ngx-govuk/commit/9433eaf7223ef3b54f8df29dc37922248bd5f79a))
* **service-navigation:** add service navigation ([41ba9e2](https://github.com/tgreyuk/ngx-govuk/commit/41ba9e2e706050e05b7b49a394c697ed6da1626d))
* **skip-link:** add skip link ([c9ab405](https://github.com/tgreyuk/ngx-govuk/commit/c9ab405f5b286c5d1c08183a8225ef518c91a2a0))
* **summary-list:** add summary cards ([a8c4972](https://github.com/tgreyuk/ngx-govuk/commit/a8c4972258e16780582d86d78cc2decc95b435a5))
* **summary-list:** add summary list ([a9d8f8b](https://github.com/tgreyuk/ngx-govuk/commit/a9d8f8be2f1ab810f138e9522fa5a45ad7d7d708))
* **table:** add table ([bcd1e97](https://github.com/tgreyuk/ngx-govuk/commit/bcd1e97e5a9c059be3517be1d6565bf58b826026))
* **tabs:** rework tabs to follow GOV.UK Frontend ([a43f70b](https://github.com/tgreyuk/ngx-govuk/commit/a43f70bd226f20f022848b47955509035f0426f2))
* **tag:** add tag ([45a53a0](https://github.com/tgreyuk/ngx-govuk/commit/45a53a075561e024d1413468776863f96121d501))
* **task-list:** add task list ([a83404c](https://github.com/tgreyuk/ngx-govuk/commit/a83404c41a38c787ca9337bac51ad112bcd43df4))
* **warning-text:** add warning text ([e57cbf1](https://github.com/tgreyuk/ngx-govuk/commit/e57cbf1167414abf437591d38d95d5ecaa94e396))

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
