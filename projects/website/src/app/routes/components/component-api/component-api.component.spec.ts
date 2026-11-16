import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ApiEntryPoint } from './api-docs';
import { ComponentApiComponent, typeParts } from './component-api.component';

const api: ApiEntryPoint = {
  name: 'footer',
  importPath: 'ngx-govuk/footer',
  classes: [
    {
      name: 'NgxGovukFooter',
      kind: 'Component',
      selector: 'ngx-govuk-footer',
      description: [],
      inputs: [
        {
          name: 'navigation',
          kind: 'input',
          description: [],
          type: 'NgxGovukFooterSection[]',
          default: '[]',
          required: false,
        },
      ],
      outputs: [],
      methods: [],
    },
  ],
  types: [
    {
      name: 'NgxGovukFooterLink',
      kind: 'Interface',
      description: ['A link in the footer.'],
      properties: [
        {
          name: 'text',
          description: ["The link's text."],
          type: 'string',
          optional: false,
        },
        {
          name: 'href',
          description: [],
          type: 'string',
          optional: true,
        },
      ],
    },
    {
      name: 'NgxGovukFooterSection',
      kind: 'Interface',
      description: [],
      properties: [
        {
          name: 'items',
          description: [],
          type: 'NgxGovukFooterLink[]',
          optional: false,
        },
      ],
    },
    {
      name: 'NgxGovukFooterWidth',
      kind: 'Type',
      description: [],
      type: "'full' | 'one-half'",
    },
  ],
};

describe('typeParts', () => {
  it('links the names of the given types, and keeps the rest as text', () => {
    expect(
      typeParts(
        'InputSignal<NgxGovukFooterSection[] | undefined>',
        new Set(['NgxGovukFooterSection']),
      ),
    ).toEqual([
      { text: 'InputSignal<' },
      { text: 'NgxGovukFooterSection', link: 'NgxGovukFooterSection' },
      { text: '[] | undefined>' },
    ]);
  });

  it('keeps a type with no linked names as one part', () => {
    expect(
      typeParts("'full' | 'one-half'", new Set(['NgxGovukFooterLink'])),
    ).toEqual([{ text: "'full' | 'one-half'" }]);
  });
});

/** Renders the section for the given entry point, at the given level. */
async function render(
  data: ApiEntryPoint,
  headingLevel: 2 | 3,
): Promise<HTMLElement> {
  TestBed.configureTestingModule({
    imports: [ComponentApiComponent],
    providers: [
      provideRouter([]),
      provideHttpClient(),
      provideHttpClientTesting(),
    ],
  });
  const fixture = TestBed.createComponent(ComponentApiComponent);
  fixture.componentRef.setInput('componentId', data.name);
  fixture.componentRef.setInput('headingLevel', headingLevel);
  fixture.detectChanges();
  TestBed.inject(HttpTestingController)
    .expectOne(`./assets/api/${data.name}.json`)
    .flush(data);
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture.nativeElement;
}

/** Each heading as its tag and text, such as `h3 NgxGovukFooter Component`. */
function headings(element: HTMLElement): string[] {
  return [...element.querySelectorAll('h2, h3, h4, h5')].map(
    (heading) =>
      `${heading.tagName.toLowerCase()} ${heading.textContent?.replace(/\s+/g, ' ').trim()}`,
  );
}

describe('ComponentApiComponent', () => {
  describe('on the API tab', () => {
    let element: HTMLElement;

    beforeEach(async () => {
      element = await render(api, 2);
    });

    it('groups the classes and types under h2s, with item names as h3s', () => {
      expect(
        headings(element).filter((heading) => !heading.startsWith('h4')),
      ).toEqual([
        'h2 Components and directives',
        'h3 NgxGovukFooter Component',
        'h2 Types',
        'h3 NgxGovukFooterLink Interface',
        'h3 NgxGovukFooterSection Interface',
        'h3 NgxGovukFooterWidth Type',
      ]);
    });

    it("puts each item's subheadings at h4", () => {
      expect(
        headings(element).filter((heading) => heading.startsWith('h4')),
      ).toEqual([
        'h4 Selector',
        'h4 Inputs',
        'h4 Properties',
        'h4 Properties',
        'h4 Type',
      ]);
    });

    it('lists every item in the contents, linked to its heading', () => {
      const groups = [
        ...element.querySelectorAll('.app-api-contents__group'),
      ].map((group) => ({
        title: group.querySelector('p')?.textContent?.trim(),
        links: [...group.querySelectorAll('a')].map((link) =>
          link.getAttribute('href'),
        ),
      }));
      expect(groups).toEqual([
        {
          title: 'Components and directives',
          links: ['/#NgxGovukFooter'],
        },
        {
          title: 'Types',
          links: [
            '/#NgxGovukFooterLink',
            '/#NgxGovukFooterSection',
            '/#NgxGovukFooterWidth',
          ],
        },
      ]);
      for (const link of element.querySelectorAll('.app-api-contents a')) {
        const id = link.getAttribute('href')?.split('#')[1] ?? '';
        expect(element.querySelector(`h3[id="${id}"]`)).not.toBeNull();
      }
    });

    it("lists an interface's properties, marking those that aren't optional", () => {
      // Name, type and the Required tag, which CSS margins space apart.
      const terms = [...element.querySelectorAll('dt')].map((dt) =>
        [...dt.children].map((child) => child.textContent),
      );
      expect(terms).toEqual([
        ['[navigation]', 'NgxGovukFooterSection[]'],
        ['text', 'string', 'Required'],
        ['href', 'string'],
        ['items', 'NgxGovukFooterLink[]', 'Required'],
      ]);
    });

    it("shows a type alias's definition", () => {
      const codes = [...element.querySelectorAll('code')].map(
        (code) => code.textContent,
      );
      expect(codes).toContain("'full' | 'one-half'");
    });

    it('links a type to the interface it names, without adding spaces', () => {
      const code = [...element.querySelectorAll('code')].find((code) =>
        code.textContent?.startsWith('NgxGovukFooterSection'),
      );
      expect(code?.textContent).toBe('NgxGovukFooterSection[]');
      const link = code?.querySelector('a');
      expect(link?.textContent).toBe('NgxGovukFooterSection');
      expect(link?.getAttribute('href')).toBe('/#NgxGovukFooterSection');
      expect(element.querySelector('h3#NgxGovukFooterSection')).not.toBeNull();
    });
  });

  it('puts every heading one level lower in a guide', async () => {
    const element = await render(api, 3);
    expect(headings(element).slice(0, 5)).toEqual([
      'h3 Components and directives',
      'h4 NgxGovukFooter Component',
      'h5 Selector',
      'h5 Inputs',
      'h3 Types',
    ]);
    expect(element.querySelector('h4#NgxGovukFooterLink')).not.toBeNull();
  });

  it('leaves out the contents, and the empty group, for a single item', async () => {
    const element = await render({ ...api, types: [] }, 2);
    expect(element.querySelector('.app-api-contents')).toBeNull();
    expect(
      headings(element).filter((heading) => heading.startsWith('h2')),
    ).toEqual(['h2 Components and directives']);
  });
});
