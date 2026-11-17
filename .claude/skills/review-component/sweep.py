#!/usr/bin/env python3
"""Runs the review checks that a search can do, across every component.

Run from the repository root, after `npm run website:api`:

    python3 .claude/skills/review-component/sweep.py

Prints each check's findings, or "none". Findings are leads to review, not
verdicts: read the code before reporting one.
"""

import json
import os
import re
from pathlib import Path

LIB = Path('projects/ngx-govuk')
COMPONENTS = Path('projects/website/src/app/routes/components')
EXAMPLES = COMPONENTS / 'examples'
API = Path('projects/website/src/assets/api')

# GOV.UK classes for laying out page content, which examples may use.
LAYOUT_CLASS = re.compile(
    r'^govuk-(body|link|list|heading|caption|visually-hidden|section-break'
    r'|grid|width-container|main-wrapper|template|!-)'
)


# HTML attributes, global and on common elements, old ones included. An input
# with one of these names stays in the DOM as that attribute when written
# bare, where the browser or assistive technology may act on it.
NATIVE_ATTRIBUTES = set('''
accesskey autocapitalize autofocus class contenteditable dir draggable
enterkeyhint hidden id inert inputmode is lang nonce popover role slot
spellcheck style tabindex title translate
accept action align alt autocomplete bgcolor border checked color cols
colspan content data datetime download face for form headers height href
hreflang label list max maxlength media method min minlength multiple name
open pattern placeholder readonly rel required rows rowspan scope selected
size span src start step summary target type valign value width wrap
'''.split())

# Native names the library uses on purpose, with the same meaning.
SAME_MEANING = {'disabled', 'name', 'value'}


def library_sources():
    return sorted(
        p for p in LIB.rglob('*.ts')
        if not p.name.endswith('.spec.ts') and 'node_modules' not in p.parts
    )


def report(title, findings):
    print(f'## {title}')
    for finding in findings or ['none']:
        print(f'- {finding}')
    print()


def hard_coded_classes():
    findings = []
    for path in sorted(EXAMPLES.rglob('*.html')):
        classes = set()
        for value in re.findall(r'\bclass="([^"]*)"', path.read_text()):
            classes.update(
                c for c in value.split()
                if c.startswith('govuk-') and not LAYOUT_CLASS.match(c)
            )
        classes.update(re.findall(r'\[class\.(govuk-[^\]]+)\]', path.read_text()))
        if classes:
            findings.append(f'{path}: {", ".join(sorted(classes))}')
    return findings


def decorators_and_common_module():
    pattern = re.compile(
        r'@(HostBinding|HostListener|Input|Output)\(|\bCommonModule\b|\bngClass\b'
    )
    findings = []
    for path in library_sources():
        for number, line in enumerate(path.read_text().splitlines(), 1):
            if pattern.search(line):
                findings.append(f'{path}:{number}: {line.strip()}')
    for path in sorted(LIB.rglob('*.html')):
        for number, line in enumerate(path.read_text().splitlines(), 1):
            if 'ngClass' in line:
                findings.append(f'{path}:{number}: {line.strip()}')
    return findings


def booleans_without_transform():
    pattern = re.compile(r'\binput(<boolean[^>]*>)?\((true|false)?\)')
    findings = []
    for path in library_sources():
        for number, line in enumerate(path.read_text().splitlines(), 1):
            if pattern.search(line) and 'booleanAttribute' not in line:
                findings.append(f'{path}:{number}: {line.strip()}')
    return findings


def native_attribute_inputs():
    findings = []
    for path in sorted(API.glob('*.json')):
        for api_class in json.loads(path.read_text())['classes']:
            for member in api_class['inputs']:
                name = member['name'].lower()
                if name in NATIVE_ATTRIBUTES and name not in SAME_MEANING:
                    findings.append(f"{api_class['name']}.{member['name']}")
    return findings


def element_components_without_display():
    findings = []
    for path in library_sources():
        source = path.read_text()
        if re.search(r"selector: 'ngx-govuk-", source) and ':host' not in source:
            findings.append(str(path))
    return findings


def host_display_without_where():
    # A bare `:host` rule outranks GOV.UK's own rules on the root, such as
    # one that hides it, so display rules go inside `:where(...)`.
    findings = []
    for path in library_sources():
        source = path.read_text()
        if re.search(r'(?<!:where\()(?<!\w):host\b[^{]*\{\s*display:\s*block', source):
            findings.append(str(path))
    return findings


def summaries_and_jsdoc():
    data = (COMPONENTS / 'components.data.ts').read_text()
    entries = re.finditer(
        r"id: '([a-z-]+)',\s*status: 'documented',(?:\s*source: '[^']*',)?"
        r"\s*description:\s*(['\"])(.*?)\2,",
        data,
        re.S,
    )
    findings = []
    for entry in entries:
        component_id, summary = entry.group(1), entry.group(3).replace("\\'", "'")
        path = API / f'{component_id}.json'
        if not path.exists():
            findings.append(f'{component_id}: no API reference at {path}')
            continue
        name = 'NgxGovuk' + ''.join(w.title() for w in component_id.split('-'))
        classes = [c for c in json.loads(path.read_text())['classes'] if c['name'] == name]
        if not classes:
            findings.append(f'{component_id}: no class named {name}')
            continue
        first = (classes[0]['description'] or [''])[0]
        if first.rstrip('.').startswith(summary.rstrip('.')):
            continue
        findings.append(f'{component_id}\n  site:  {summary}\n  JSDoc: {first}')
    return findings


def govuk_components_not_documented():
    """GOV.UK Frontend's components that the docs site lacks or hasn't documented."""
    installed = Path('node_modules/govuk-frontend/dist/govuk/components')
    data = (COMPONENTS / 'components.data.ts').read_text()
    status = dict(re.findall(r"id: '([a-z-]+)',\s*status: '([a-z-]+)'", data))
    # GOV.UK Frontend folders that aren't a Design System page of their own
    # (None), or whose page id differs from the folder.
    folders = {'hint': None, 'label': None, 'input': 'text-input'}
    findings = []
    for folder in sorted(p.name for p in installed.iterdir() if p.is_dir()):
        component = folders.get(folder, folder)
        if component is None:
            continue
        if component not in status:
            findings.append(f'{component}: not in components.data.ts (new in GOV.UK Frontend?)')
        elif status[component] != 'documented':
            findings.append(f'{component}: {status[component]}')
    return findings


if __name__ == '__main__':
    if not API.exists() or not os.listdir(API):
        raise SystemExit('Run `npm run website:api` first.')
    report('Examples that hard-code component classes', hard_coded_classes())
    report('Decorators, CommonModule or ngClass', decorators_and_common_module())
    report('True/false inputs without booleanAttribute', booleans_without_transform())
    report('Inputs named like native HTML attributes', native_attribute_inputs())
    report(
        'Element-selector components with no :host style',
        element_components_without_display(),
    )
    report(
        'Host display rules not wrapped in :where',
        host_display_without_where(),
    )
    report('Site summaries that differ from the JSDoc', summaries_and_jsdoc())
    report(
        "GOV.UK Frontend components the library doesn't document yet",
        govuk_components_not_documented(),
    )
