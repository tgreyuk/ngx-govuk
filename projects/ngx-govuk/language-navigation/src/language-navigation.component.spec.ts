import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  NgxGovukLanguageNavigation,
  NgxGovukLanguageNavigationItem,
} from './language-navigation.component';

@Component({
  imports: [NgxGovukLanguageNavigation],
  template: `<ngx-govuk-language-navigation
    [items]="items()"
    [inverse]="inverse()"
  />`,
})
class TestHostComponent {
  items = signal<NgxGovukLanguageNavigationItem[]>([
    { text: 'English', lang: 'en' },
    {
      text: 'Cymraeg',
      lang: 'cy',
      routerLink: '/cy',
      languageDescriptionText: "Newid yr iaith i'r Cymraeg",
    },
    {
      text: 'العربية',
      lang: 'ar',
      dir: 'rtl',
      href: '/ar/',
      hrefLang: 'ar-SA',
    },
  ]);
  inverse = signal(false);
}

function setup() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  return { fixture, element };
}

describe('NgxGovukLanguageNavigation', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().element).toMatchSnapshot();
  });

  it('marks the language without a link as current', () => {
    const current = setup().element.querySelector('[aria-current]');
    expect(current?.tagName).toBe('SPAN');
    expect(current?.textContent).toBe('English');
    expect(current?.getAttribute('lang')).toBe('en');
  });

  it('links to the other languages', () => {
    const links = Array.from(setup().element.querySelectorAll('a'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['/cy', '/ar/']);
    expect(links.map((a) => a.getAttribute('hreflang'))).toEqual([
      'cy',
      'ar-SA',
    ]);
    expect(links[1].getAttribute('dir')).toBe('rtl');
    expect(links[0].textContent).toBe("Cymraeg Newid yr iaith i'r Cymraeg");
  });

  it('marks a linked language as current when set', () => {
    const { fixture, element } = setup();
    fixture.componentInstance.items.set([
      { text: 'English', lang: 'en', href: '/en/', current: true },
      { text: 'Cymraeg', lang: 'cy', href: '/cy/' },
    ]);
    fixture.detectChanges();
    expect(element.querySelector('[aria-current]')?.textContent).toBe(
      'English',
    );
    expect(element.querySelectorAll('a').length).toBe(1);
  });

  it('can be shown on a dark background', () => {
    const { fixture, element } = setup();
    fixture.componentInstance.inverse.set(true);
    fixture.detectChanges();
    expect(element.querySelector('nav')?.classList).toContain(
      'govuk-language-navigation--inverse',
    );
  });
});
