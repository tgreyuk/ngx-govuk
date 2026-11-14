# Testing

How the library's tests work today, and ideas for improving them.

## What we do now

Tests use Vitest through `ng test` (`npm run lib:test`). Each component or
directive has a spec next to it, with a small host component that uses it the
way a consumer would.

### Markup

The library's job is to render GOV.UK Frontend's markup exactly, so its CSS
applies unchanged. Getting that right is a manual step:

1. Read the component's Nunjucks template in govuk-frontend,
   `node_modules/govuk-frontend/dist/govuk/components/<name>/template.njk`,
   and the rendered examples next to it (`template-*.html`).
2. Write the Angular template or host bindings to produce the same elements,
   classes and attributes.
3. Run the tests. Each spec has a snapshot test, and the first run writes the
   snapshot.
4. Compare the snapshot with GOV.UK's template by eye.

So a snapshot records what **our** component renders, not what GOV.UK
renders. It catches unintended changes from then on, but nothing checks
automatically that the first version matched GOV.UK, or that it still matches
after a govuk-frontend upgrade.

`test-setup.ts` strips Angular's own attributes (`ng-version`,
`_ngcontent-*` and so on), comments and TestBed's generated root ids from
snapshots, so they record only the markup GOV.UK Frontend's CSS depends on.
Angular upgrades don't churn them. When a markup change is intended, update
snapshots with `npm run lib:test:update` and check the diff.

### Behaviour

Where a component does more than render markup, its spec tests the behaviour
directly. For example, the skip link's spec checks it moves focus to the
target, adds and removes `tabindex="-1"` and the
`govuk-skip-link-focused-element` class, as GOV.UK Frontend's own
`skip-link.mjs` does. Form fields test their `ControlValueAccessor`
behaviour with reactive forms.

### Gotcha

Angular's runner shares a worker between test files (`isolate: false`), so
setup code can run more than once. Use `Symbol.for` for any marker it keeps.

## Ideas for later

### Compare markup with GOV.UK's fixtures

govuk-frontend ships a `fixtures.json` for each component, next to its
template. Each fixture has a `name` (such as `default` or `grey`), the
Nunjucks macro `options` and the rendered `html`. GOV.UK uses them for its
own tests. The tag, for example, has 12, starting with:

```json
{ "name": "default", "options": { "text": "Alpha" },
  "html": "<strong class=\"govuk-tag\">\n  Alpha\n</strong>" }
```

A shared test helper could check our output against them:

1. Render our component with the equivalent inputs and content.
2. Normalise both sides: strip Angular's attributes (as `test-setup.ts`
   does), the directive's own attribute (such as `ngxgovuktag`) and
   whitespace between and around elements.
3. For a wrapper component, compare its inner markup, not its host element
   (such as `ngx-govuk-panel`), which GOV.UK doesn't have.
4. Assert the two match, in a test named after the fixture: "matches
   GOV.UK's `grey` fixture".

This would replace the by-eye check, and a govuk-frontend upgrade would flag
any markup GOV.UK changes.

Things to decide:

- **Which fixtures to use.** Some cover macro options we deliberately don't
  offer, because Angular handles them with native attributes and content
  projection: `classes`, `attributes`, `id`, and `html` passed as a string
  ("html as text"). Each spec would list the fixtures that apply, rather than
  run them all.
- **Mapping options to inputs.** Most map directly (`iconFallbackText`,
  `headingLevel`), but some don't. GOV.UK's panel sets its type through
  `classes: "govuk-panel--interruption"` and its actions through an `actions`
  object, where ours uses `panelType` and an `ngx-govuk-button-group`. A small
  table per spec could map each fixture to a host template.
- **Where the helper lives.** Not in the published library: a file such as
  `projects/ngx-govuk/testing/govuk-fixtures.ts`, imported only by specs,
  and excluded from the library build like `test-setup.ts`.
- **Whether to keep snapshots.** Fixture tests would cover GOV.UK's markup.
  Snapshots could stay for markup that has no fixture, or go.
- **Known gaps they'd surface.** For example, GOV.UK's panel leaves out
  its body when there's no body text (the `title with no body text`
  fixture), and ours always renders it.
