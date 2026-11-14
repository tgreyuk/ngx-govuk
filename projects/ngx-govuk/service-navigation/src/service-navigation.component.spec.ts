import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import {
  NgxGovukServiceNavigation,
  NgxGovukServiceNavigationItem,
} from './service-navigation.component';

@Component({ template: '' })
class PageComponent {}

@Component({
  imports: [NgxGovukServiceNavigation],
  template: `<ngx-govuk-service-navigation
    [serviceName]="serviceName()"
    serviceLink="/"
    navigationId="navigation"
    [navigation]="navigation()"
  />`,
})
class TestHostComponent {
  serviceName = signal<string | undefined>('Apply for a juggling licence');
  navigation = signal<NgxGovukServiceNavigationItem[]>([
    { text: 'Home', routerLink: '/' },
    { text: 'Your licences', routerLink: '/licences' },
    { text: 'Your account', routerLink: ['/account'] },
  ]);
}

/** Pretends the screen is wide or narrow, as `matchMedia` would report. */
function stubScreen(wide: boolean) {
  const listeners: (() => void)[] = [];
  const query = {
    matches: wide,
    addEventListener: (_: string, fn: () => void) => listeners.push(fn),
    removeEventListener: () => undefined,
  };
  // jsdom has no matchMedia.
  vi.stubGlobal('matchMedia', () => query);
  return {
    resize(isWide: boolean) {
      query.matches = isWide;
      listeners.forEach((fn) => fn());
    },
  };
}

async function setup(url = '/', wide = true) {
  const screen = stubScreen(wide);
  TestBed.configureTestingModule({
    providers: [provideRouter([{ path: '**', component: PageComponent }])],
  });
  await TestBed.inject(Router).navigateByUrl(url);
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  // Show what the render hook found out about the screen.
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const $ = (selector: string) =>
    element.querySelector(selector) as HTMLElement;
  return { fixture, element, $, screen };
}

afterEach(() => vi.unstubAllGlobals());

describe('NgxGovukServiceNavigation', () => {
  it('matches the GOV.UK markup snapshot', async () => {
    const { element } = await setup('/licences');
    expect(element).toMatchSnapshot();
  });

  it('marks the current page and the section users are in', async () => {
    const { fixture, element } = await setup('/licences/123?tab=history');
    const current = () =>
      Array.from(element.querySelectorAll('li a')).map((a) =>
        a.getAttribute('aria-current'),
      );
    expect(current()).toEqual([null, 'true', null]);

    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    expect(current()).toEqual(['page', null, null]);
  });

  it('uses a div, not a landmark, without a service name', async () => {
    const { fixture, element } = await setup();
    fixture.componentInstance.serviceName.set(undefined);
    fixture.detectChanges();
    expect(element.querySelector('section')).toBeNull();
    expect(
      element.querySelector('div.govuk-service-navigation'),
    ).not.toBeNull();
  });

  it('collapses the navigation behind the menu button on small screens', async () => {
    const { fixture, $, screen } = await setup('/', false);
    const button = $('.govuk-service-navigation__toggle');
    const list = $('#navigation');
    expect(button.hasAttribute('hidden')).toBe(false);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(list.hasAttribute('hidden')).toBe(true);

    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(list.hasAttribute('hidden')).toBe(false);

    screen.resize(true);
    fixture.detectChanges();
    expect(button.hasAttribute('hidden')).toBe(true);
    expect(button.getAttribute('aria-hidden')).toBe('true');
    expect(list.hasAttribute('hidden')).toBe(false);
  });

  it('has no menu button with one item', async () => {
    const { fixture, $ } = await setup('/', false);
    fixture.componentInstance.navigation.set([
      { text: 'Home', routerLink: '/' },
    ]);
    fixture.detectChanges();
    expect($('.govuk-service-navigation__toggle')).toBeNull();
    expect($('#navigation').hasAttribute('hidden')).toBe(false);
  });
});
