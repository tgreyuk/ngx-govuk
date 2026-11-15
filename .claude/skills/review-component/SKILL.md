---
name: review-component
description: Review one ngx-govuk component — its library code against GOV.UK Frontend, and its docs page — then fix what's agreed. Use when asked to review a component, such as "/review-component button" or "next component - tabs".
---

# Review a component

Review one component end to end: the library code in
`projects/ngx-govuk/<id>/` and its page on the docs site. The argument is the
component's id, as in its GOV.UK Design System URL, such as `button` or
`character-count`.

Follow AGENTS.md throughout. Its "Components and directives" section holds
the conventions this review checks against.

## 1. Read

- Every file in `projects/ngx-govuk/<id>/src/`, including the spec and its
  snapshot. Skip the entry point's boilerplate `README.md`.
- GOV.UK Frontend's version of it, in
  `node_modules/govuk-frontend/dist/govuk/components/<id>/`:
  - `template.njk` for the markup.
  - `macro-options.json` for every option. Print nested `params` too.
  - The component's `.mjs` file, if it has one, for what its JavaScript adds
    to the markup and how it behaves.
  - `_mixin.scss` when the CSS decides behaviour, such as how something is
    hidden.
- The docs page's data: the entry in
  `projects/website/src/app/routes/components/components.data.ts`, the
  examples in `examples/<id>/` and their entries in `examples.ts`.
- The API reference: run `npm run website:api` and read
  `projects/website/src/assets/api/<id>.json`.

## 2. Check

**Markup**

- Compare the rendered markup (the snapshot) with GOV.UK's template and,
  where GOV.UK's JavaScript changes it, with the enhanced markup. Classes,
  elements, ARIA attributes and the order of elements should match.
- Look for extra attributes GOV.UK doesn't have, and for small ones it does,
  such as `data-nosnippet`.
- Look for stray whitespace inside text elements, such as a heading's text
  with a space at each end. It shows in the snapshot as `" Heading "`.

**Behaviour**

- Check what GOV.UK's JavaScript does and whether the Angular version does
  it too, such as opening a closed section on find in page.
- Look for code that moves, wraps or creates elements around content
  Angular rendered. It breaks with `@for` and with hydration. The fix is a
  structural directive and a parent that renders the wrapper (see
  AGENTS.md).
- Check that the component works when its content comes from `@for` or
  `@if`, if it takes items.

**Options**

- List every option in `macro-options.json` and mark each one as supported,
  left out on purpose (say why), or missing. Options GOV.UK covers with
  `classes`, such as an `--inverse` modifier, count as options.
- Leave out options Angular already covers, such as `attributes` and
  `classes` on a directive, and `html` versus `text` where content is
  projected.

**Code**

- `@HostBinding`, `CommonModule` or `ngClass` where the `host` property or
  `[class.…]` bindings would do.
- True/false inputs without `booleanAttribute`.
- Input names that differ from GOV.UK's option or modifier, or from the
  library's other components (`inverse`, `headingLevel`, `labelText`).
- Members that are public but aren't part of the API (see AGENTS.md's
  "Public API").

**Docs page**

- The summary in `components.data.ts` matches GOV.UK's own one-line summary.
- The first example matches GOV.UK's default example, and its template is
  realistic, with `routerLink="."` for links.
- Each other example is a real variation, with a title and a short, factual
  description of how to get it. Don't propose an example only to show an
  input, or one that needs a demo-only wrapper, such as a dark background
  for `inverse`.
- The JSDoc reads well in the API tab: what the component is for, then how
  to use it, and what each input does in plain English.

## 3. Report

Report before changing anything. Group findings by library and docs page,
and lead with real problems (wrong behaviour, broken markup) before small
differences and missing options. For each, say what's wrong, what the fix
would be, and whether the fix is breaking.

Say which findings apply to more than this component. Fix those across the
library in one pass rather than one component at a time.

Then ask which to fix. Don't add an example without asking.

## 4. Fix

- Add or update tests for each fix and each new option: a test that would
  have failed before the fix, not only a snapshot.
- When a markup change is intended, run `npm run lib:test:update` and read
  the snapshot diff. Every line of it should be a change you meant.
- Update the docs example if the way to use the component changed.
- Don't run checks after every edit. Run them once at the end:
  `npm run lib:test`, `npm run lint`, `npx prettier --check .`,
  `npm run lib:build`, `npm run website:build`, `npm run website:test`, and
  `npm run website:api:test` if the extractor changed. Report the results.

## 5. Commit

Only when asked. Split the work so the changelog reads well:

- A `fix(<id>):` commit for wrong behaviour and markup, and a
  `feat(<id>):` commit for new options. When both touch the same files,
  write fix-only versions of the files first, test and commit them, then
  restore the full versions and commit the rest.
- A `refactor:` commit for code changes with no effect on users.
- Mark breaking changes with `!` and a `BREAKING CHANGE:` footer that says
  what users need to change.
- End each message with the `Assisted-by: Claude Code` trailer.
