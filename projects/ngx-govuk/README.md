# ngx-govuk

[![npm](https://img.shields.io/npm/v/ngx-govuk?&logo=npm)](https://www.npmjs.com/package/ngx-govuk) [![Build Status](https://github.com/tgreyuk/ngx-govuk/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/tgreyuk/ngx-govuk/actions/workflows/ci.yml)

> [GOV.UK Design System](https://design-system.service.gov.uk) components for Angular.

ngx-govuk is a community resource of the GOV.UK Design System. The Design System team is not responsible for it and cannot support you with using it. Contact the ngx-govuk maintainers directly through [GitHub issues](https://github.com/tgreyuk/ngx-govuk/issues) if you need help or you want to request a feature.

## Installation

```shell
npm install ngx-govuk govuk-frontend
```

ngx-govuk renders GOV.UK Frontend's markup and uses its styles, so `govuk-frontend` is a peer dependency. Load only its styles: ngx-govuk components handle their own behaviour, so do not load GOV.UK Frontend's JavaScript or call `initAll()`. Add `provideNgxGovuk()` to your app's providers instead. It adds the classes GOV.UK Frontend's page template puts on the `html` and `body` elements:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNgxGovuk } from 'ngx-govuk';

export const appConfig: ApplicationConfig = {
  providers: [provideNgxGovuk()],
};
```

See [Installing ngx-govuk](https://ngx-govuk.org/get-started/installation) for setting up the page, styles and font.

## Usage

Each component has its own entry point. Import the ones you need into your components:

```ts
import { Component } from '@angular/core';
import { NgxGovukButton } from 'ngx-govuk/button';

@Component({
  selector: 'app-example',
  imports: [NgxGovukButton],
  template: `<button ngxGovukButton>Save and continue</button>`,
})
export class ExampleComponent {}
```

## Documentation

- [Get started](https://ngx-govuk.org/get-started): install ngx-govuk and use its components
- [Components](https://ngx-govuk.org/components): examples and the API for each component
- [Help and support](https://ngx-govuk.org/support): getting help and supported versions

## Compatibility

| ngx-govuk | Angular | govuk-frontend |
| --------- | ------- | -------------- |
| 0.7.x     | ^22.0.0 | ^6.6.0         |

Each release supports the current major versions of Angular and govuk-frontend. When a new major version of either comes out, a new ngx-govuk minor release adds support for it and drops the previous one. Until 1.0.0, earlier ngx-govuk versions are not maintained.

## Contributing

Issues and pull requests are welcome. See [Contributing to ngx-govuk](https://github.com/tgreyuk/ngx-govuk/blob/main/CONTRIBUTING.md) for how to set up the project and make a change.

## Licence

Released under the [MIT License](https://github.com/tgreyuk/ngx-govuk/blob/main/LICENSE).
