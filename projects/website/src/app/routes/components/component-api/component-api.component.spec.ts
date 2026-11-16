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

describe('ComponentApiComponent', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ComponentApiComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    const fixture = TestBed.createComponent(ComponentApiComponent);
    fixture.componentRef.setInput('componentId', 'footer');
    fixture.componentRef.setInput('headingLevel', 2);
    fixture.detectChanges();
    TestBed.inject(HttpTestingController)
      .expectOne('./assets/api/footer.json')
      .flush(api);
    await fixture.whenStable();
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('lists the interfaces and type aliases after the classes', () => {
    const headings = [...element.querySelectorAll('h2')].map((h2) =>
      h2.textContent?.replace(/\s+/g, ' ').trim(),
    );
    expect(headings).toEqual([
      'NgxGovukFooter Component',
      'NgxGovukFooterLink Interface',
      'NgxGovukFooterSection Interface',
      'NgxGovukFooterWidth Type',
    ]);
    expect(element.querySelector('h2#NgxGovukFooterLink')).not.toBeNull();
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
  });
});
