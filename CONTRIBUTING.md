# Contributing to ngx-govuk

Thanks for helping. ngx-govuk is a community project, maintained by
volunteers, so issues and pull requests are welcome.

## Raising an issue

Use [GitHub issues](https://github.com/tgreyuk/ngx-govuk/issues) to report a
bug, ask a question or request a feature.

For a bug, say which versions of ngx-govuk, Angular and govuk-frontend you use,
and include the smallest template that shows the problem.

Questions about the design of a component, or when to use it, belong to the
[GOV.UK Design System](https://design-system.service.gov.uk). ngx-govuk follows
its guidance and markup, and doesn't change them.

## Before you start a change

Open an issue first for a new component, a new input or anything that changes
how a component behaves, so we can agree the approach before you write it.
Small fixes, such as a typo or a markup difference from GOV.UK Frontend, can go
straight to a pull request.

## Setting up

You need Node.js 22 and npm.

[Fork the repository](https://github.com/tgreyuk/ngx-govuk/fork) on GitHub,
then clone your fork:

```shell
git clone https://github.com/<your-username>/ngx-govuk.git
cd ngx-govuk
npm ci
```

The repository is an Angular CLI workspace with two projects:

- `projects/ngx-govuk`: the library, published to npm.
- `projects/website`: the documentation site at
  [ngx-govuk.org](https://ngx-govuk.org).

Useful commands:

| Command                   | Does                                          |
| ------------------------- | --------------------------------------------- |
| `npm run website:start`   | Serves the documentation site locally         |
| `npm run lib:test`        | Runs the library's tests                      |
| `npm run lib:test:update` | Runs the tests and rewrites changed snapshots |
| `npm run lib:lint`        | Lints the library                             |
| `npm run lib:build`       | Builds the library                            |
| `npm run website:build`   | Builds the documentation site                 |

## Making a change

Make each change on its own feature branch, created from an up-to-date `main`,
with a short name that says what it's for. Sync your fork on GitHub first, then:

```shell
git checkout main
git pull
git checkout -b fix-tabs-focus
```

Open a pull request from your branch against `main`, and keep each pull request
to one change. The maintainer reviews and merges pull requests, and handles
releases.

### Components

Each component renders GOV.UK Frontend's markup and classes exactly, so its
CSS applies unchanged. Never copy or change GOV.UK Frontend's styles.

Work from the component's template in govuk-frontend, at
`node_modules/govuk-frontend/dist/govuk/components/<name>/template.njk`, and
the rendered examples next to it. Where GOV.UK Frontend uses JavaScript, write
the same behaviour in Angular. [docs/testing.md](docs/testing.md) explains how
we check markup.

[AGENTS.md](AGENTS.md) sets out the full conventions, including:

- naming and selectors
- when to use a directive or a component
- signal inputs and models
- what counts as public API
- how to write JSDoc, which builds the API section of the docs

It's written for AI coding agents, but the conventions are the same for
everyone.

### Tests

Each component has a spec next to it, with a small host component that uses it
the way an app would, and a snapshot of its markup. If you change markup on
purpose, run `npm run lib:test:update` and check the snapshot's diff against
GOV.UK Frontend.

Before you open a pull request, run:

```shell
npm run lib:lint
npm run lib:test
npm run lib:build
```

CI runs the same checks on pull requests that change the library.

### Documentation

A new component needs a page on the documentation site: an entry in
`projects/website/src/app/routes/components/components.data.ts`, and at least one
example in `projects/website/src/app/routes/components/examples/`. The example's
template is shown on the page as code, so keep it realistic and
self-contained.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/), such as
`fix(tabs): keep focus on the selected tab`, with the component's id in
brackets. The release notes are built from them:

- `feat` and `fix` commits that change the library appear in the changelog, so
  write them for people using the library.
- Mark a breaking change with `!` after the type, and add a
  `BREAKING CHANGE:` footer that says what people need to change.

`npm install` sets up Git hooks that lint and format your staged files and
check each commit message, so a commit that isn't a Conventional Commit is
rejected.

If you used an AI coding tool, add a trailer naming it at the end of the
commit message, such as `Assisted-by: Claude Code`. Don't use
`Co-Authored-By` for a tool.

## Licence

ngx-govuk is released under the [MIT License](LICENSE). By contributing, you
agree that your contributions are released under the same licence.
