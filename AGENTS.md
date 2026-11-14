# Agent instructions

Guidance for AI coding agents working in this repository.

## What this is

ngx-govuk is a library of [GOV.UK Design System](https://design-system.service.gov.uk)
components for Angular, plus the documentation site at
[ngx-govuk.org](https://ngx-govuk.org). It is a plain Angular CLI workspace
with two projects:

- `projects/ngx-govuk` — the library, published to npm as `ngx-govuk`.
- `projects/website` — the documentation site, deployed by Vercel
  (`vercel.json`).

`scripts/extract-api.mts` builds the docs site's API reference from the
library source.

## Commands

| Command                    | Does                                                |
| -------------------------- | --------------------------------------------------- |
| `npm run lib:build`        | Builds the library into `dist/ngx-govuk`            |
| `npm run lib:test`         | Runs the library's tests once                       |
| `npm run lib:test:update`  | Runs them and rewrites changed snapshots            |
| `npm run lib:lint`         | Lints the library                                   |
| `npm run website:start`    | Writes the API reference, then serves the docs site |
| `npm run website:build`    | Writes the API reference, then builds the docs site |
| `npm run website:test`     | Runs the docs site's tests once                     |
| `npm run website:lint`     | Lints the docs site                                 |
| `npm run website:api`      | Writes the API reference only                       |
| `npm run website:api:test` | Tests the API extractor                             |
| `npm run lint`             | Lints the whole repository with ESLint              |
| `npm run format`           | Formats the whole repository with Prettier          |
| `npm run format:check`     | Checks formatting without changing files            |

CI runs on every push and pull request: it lints the whole repository, builds
and tests the library, and runs the docs site's and API extractor's tests. On
pull requests it also checks commit messages with commitlint. Vercel builds
the docs site itself. Node 22 runs the `.mts` scripts directly, with no build
step.

`npm install` sets up two Git hooks with husky: pre-commit runs `eslint --fix`
and then Prettier on the staged files, and commit-msg checks the message with
commitlint. Formatting is left to the hook, not CI. Don't skip the hooks with
`--no-verify`.

## Library conventions

### Entry points

Each component is a secondary entry point: a folder under
`projects/ngx-govuk/` with an `ng-package.json` and `src/index.ts`, imported
as `ngx-govuk/<name>`, such as `ngx-govuk/button`. Shared code (the field
interface, models and the utils service) is in `projects/ngx-govuk/src` and
imported as `ngx-govuk`. Name folders after the GOV.UK component's id, as in
its Design System URL.

### Components and directives

- Render GOV.UK Frontend's markup and classes exactly, so its CSS applies
  unchanged. govuk-frontend is a peer dependency; never copy its styles.
- Prefix class names `NgxGovuk` with no suffix (`NgxGovukButton`), element
  selectors `ngx-govuk-` and attribute selectors `ngxGovuk`. Lint enforces
  the selectors.
- Use a directive on the native element where GOV.UK's markup is a single
  element (`a[ngxGovukButton]`, `input[ngxGovukTextInput]`), so it keeps all
  its own attributes, and a component where GOV.UK wraps content.
- Use `input()`, `input.required()`, `model()` and `output()`, not
  decorators. Use `model()` for state a consumer may want to bind both ways,
  such as the accordion panel's `expanded`.
- Don't set `changeDetection`: OnPush is the default in Angular 22, which
  the library requires.
- Form fields are directives that provide themselves as `NGX_GOVUK_FIELD`
  and go inside `ngx-govuk-form-group`, which adds the label, hint and error
  message. See the text input and textarea.

### Public API

A class's public API is its selector, inputs, models, outputs and any
methods meant to be called through a template reference. Everything else is
`private` or `protected`; templates can read `protected` members. If a member
must be public only because another component in the library uses it, tag it
`@internal`, as with the form group's `fieldId`.

Breaking changes are fine before 1.0.0, but mark them (see Commit messages).

### JSDoc

The API section of the docs site is built from JSDoc, so write it for
someone using the component:

- On each component or directive: what it is for, then how to use it, such as
  "Styles a `button` or `a` element as a GOV.UK button." Follow GOV.UK's own
  one-line summary where there is one.
- On each input, model, output and public method: what it does in plain
  English, and what each value means where that isn't obvious.
- Write selectors, attributes and values as inline code. Use GOV.UK's style:
  short sentences, no "please", sentence case.
- Leave out `@selector`, `@initialValue` and similar tags: the extractor reads
  selectors, defaults and required inputs from the code.

## Tests

Tests use Vitest through `ng test`. Each component has a spec next to it
with a small host component. `test-setup.ts` strips Angular's own attributes
and comments from snapshots, so a snapshot records only the markup GOV.UK
Frontend's CSS depends on. When a markup change is intended, update the
snapshot with `npm run lib:test:update` and check its diff.

Angular's runner shares a worker between test files (`isolate: false`), so
setup code can run more than once: use `Symbol.for` for any marker it keeps.

[docs/testing.md](docs/testing.md) explains how markup is checked against
GOV.UK Frontend today, and ideas for testing it automatically.

## Docs site

- `projects/website/src/app/routes/components/components.data.ts` lists every
  GOV.UK component with its status: `documented` (has a page), `in-progress`
  or `to-do`.
- A component's page has two tabs, each its own route: Examples at
  `/components/<id>` and API at `/components/<id>/api`.
- The API section reads `assets/api/<entry-point>.json`, which
  `npm run website:api` writes from the library source. It is gitignored. It
  lists the selector, inputs (including models), outputs and documented
  methods; other properties are deliberately left out.

### Styling

The site has two looks, kept apart on purpose:

- **Component previews and page content use GOV.UK Frontend.** Its styles are
  compiled by the site's build from `projects/website/govuk-frontend.scss`,
  so they always match the installed govuk-frontend. That file swaps GDS
  Transport for Arial, since only GOV.UK services may use it, and widens the
  page to 1100px. Lay out page content with GOV.UK's own classes, such as
  `govuk-body`, `govuk-heading-m` and the `govuk-!-margin-*` spacing
  utilities.
- **The site's own chrome (header, menus, footer, code blocks, API section)
  has its own look,** so the site can't be mistaken for GOV.UK: Inter, and the
  colours in the `--app-*` custom properties at the top of
  `projects/website/src/styles.scss`. Never use GOV.UK's crest, logo or
  typeface, or its start button outside the component examples.

Site styles are global, in `styles.scss`, with an `app-` prefix and a short
comment saying what each is for. Keep component stylesheets small: the build
warns past 2 kB per component.

### Examples

Each example is a small standalone component in
`projects/website/src/app/routes/components/examples/<component>/<name>.component.{ts,html}`,
listed for its component in `examples.ts`. The page renders it live, with
its template underneath as code.

- The code shown is the example's `.html` file itself: the build copies the
  `examples/` folder to the site, and the page fetches the template from
  there. So the template is exactly what readers copy. Keep it realistic and
  self-contained, with no demo-only wrappers, and give links a real target
  with `routerLink="."`, not `href="#"`.
- The `.ts` file isn't shown on component pages, since the API section gives
  the import. It only needs to import what the template uses. A guide can
  show it too with `showComponentCode`, when the class does real work, as in
  the forms guide.
- The first example shows the default and has no title. Each later one has a
  `title` and a `description`: a short, factual line on how to get that
  variant, such as which input to set. Guidance on when to use it belongs to
  the GOV.UK Design System.
- Add an example only for a real variation of the component, such as a
  secondary button, not to show an input the API section already covers.
  Ask before adding one.

## Branches and releases

Work on a feature branch created from `main`, one per change, with a short
name that says what it's for, such as `fix-tabs-focus`. Open a pull request
against `main`. If you're told to work on another branch, such as `dev`, do
that instead.

The repository owner reviews and merges pull requests. They're rebase-merged,
so each commit lands on `main` as it is: keep commits focused, and make each
message a Conventional Commit. A pull request from `dev` is the exception: it
gets a merge commit, so `dev` doesn't need resetting afterwards.

On every push to `main`, release-please opens or updates a release pull
request with the next version and a changelog built from the commits. Its
changelog can be edited before merging, in both `CHANGELOG.md` and the pull
request description, which becomes the GitHub release notes. Merging the
release pull request tags the release, creates the GitHub release and
stages it on npm through trusted publishing, with no npm token. It goes live
once the repository owner approves it on npmjs.com. If staging fails, run the
Release workflow by hand from `main` with the release's tag.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`, `ci:`). Release
tooling reads them to decide version bumps and changelog entries, so:

- Only `feat` and `fix` commits that touch `projects/ngx-govuk` appear in the
  changelog. Write their subjects for people using the library.
- Mark a breaking change with `!` after the type and a `BREAKING CHANGE:`
  footer that says what users need to change. The footer is what the
  changelog shows.

### AI attribution

Mark work done with an AI coding agent with a single trailer at the end of the
commit message:

```
Assisted-by: Claude Code
```

The trailer names the tool, with no email address.

Do not use `Co-Authored-By` for an AI tool. Git and GitHub treat that trailer
as a second author and list it as a contributor, but a tool can't take
responsibility for a change. The person who reviews and pushes the change is
its only author.

Pull request descriptions carry no AI attribution: no "Generated with …"
footer and no `Assisted-by:` trailer. The trailer goes in commit messages only;
this file is the project's disclosure that AI agents work here.
