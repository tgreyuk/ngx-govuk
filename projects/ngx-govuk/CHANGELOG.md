# Changelog

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
