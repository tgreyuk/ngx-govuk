import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import {
  NgxGovukServiceNavigation,
  NgxGovukServiceNavigationEnd,
  NgxGovukServiceNavigationEndItem,
  NgxGovukServiceNavigationItem,
  NgxGovukServiceNavigationStart,
  NgxGovukServiceNavigationStartItem,
} from './service-navigation.component';

@Component({ template: '' })
class PageComponent {}

@Component({
  imports: [NgxGovukServiceNavigation],
  template: `<ngx-govuk-service-navigation
    [serviceName]="serviceName()"
    serviceLink="/"
    [serviceUrl]="serviceUrl()"
    navigationId="navigation"
    [navigation]="navigation()"
    [inverse]="inverse()"
  />`,
})
class TestHostComponent {
  serviceName = signal<string | undefined>('Apply for a juggling licence');
  serviceUrl = signal<string | undefined>(undefined);
  inverse = signal(false);
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

@Component({
  imports: [
    NgxGovukServiceNavigation,
    NgxGovukServiceNavigationStart,
    NgxGovukServiceNavigationEnd,
    NgxGovukServiceNavigationStartItem,
    NgxGovukServiceNavigationEndItem,
  ],
  template: `<ngx-govuk-service-navigation navigationId="navigation">
    <div ngxGovukServiceNavigationStart id="start">Start</div>
    <li ngxGovukServiceNavigationStartItem id="first">First</li>
    <li ngxGovukServiceNavigationEndItem id="last">Last</li>
    <div ngxGovukServiceNavigationEnd [inline]="inline()" id="end">End</div>
  </ngx-govuk-service-navigation>`,
})
class SlotsHostComponent {
  inline = signal(false);
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

  it('displays as a block', async () => {
    const { $ } = await setup('/licences');
    expect(getComputedStyle($('ngx-govuk-service-navigation')).display).toBe(
      'block',
    );
  });

  it('has no space around the button and link text', async () => {
    const { $, element } = await setup('/licences', false);
    expect($('.govuk-service-navigation__toggle').textContent).toBe('Menu');
    expect(
      Array.from(element.querySelectorAll('li a')).map((a) => a.textContent),
    ).toEqual(['Home', 'Your licences', 'Your account']);
  });

  it('links the service name outside the app with serviceUrl', async () => {
    const { fixture, $ } = await setup();
    const name = () => $('.govuk-service-navigation__service-name a');
    expect(name().getAttribute('href')).toBe('/');

    fixture.componentInstance.serviceUrl.set('https://www.gov.uk/juggling');
    fixture.detectChanges();
    expect(name().getAttribute('href')).toBe('https://www.gov.uk/juggling');
  });

  it('links an item outside the app with href', async () => {
    const { fixture, element } = await setup('/sign-out');
    fixture.componentInstance.navigation.set([
      { text: 'Sign out', href: '/sign-out', routerLink: '/sign-out' },
    ]);
    fixture.detectChanges();
    const link = element.querySelector('li a') as HTMLElement;
    expect(link.getAttribute('href')).toBe('/sign-out');
    // An href isn't matched against the router's URL.
    expect(link.hasAttribute('aria-current')).toBe(false);
  });

  it('lets items be marked current or active by hand', async () => {
    const { fixture, element } = await setup('/licences');
    fixture.componentInstance.navigation.set([
      { text: 'Home', routerLink: '/', active: true },
      { text: 'Your licences', routerLink: '/licences', current: false },
      { text: 'Your account', current: true },
    ]);
    fixture.detectChanges();
    const items = Array.from(element.querySelectorAll('li'));
    expect(
      items.map(
        (li) => li.firstElementChild?.getAttribute('aria-current') ?? null,
      ),
    ).toEqual(['true', 'true', 'page']);
    expect(
      items.map((li) =>
        li.classList.contains('govuk-service-navigation__item--active'),
      ),
    ).toEqual([true, true, true]);
    const text = items[2].querySelector('.govuk-service-navigation__text');
    expect(text?.getAttribute('aria-current')).toBe('page');
    expect(text?.querySelector('strong')?.textContent).toBe('Your account');
  });

  it('styles the navigation for a dark background', async () => {
    const { fixture, $ } = await setup();
    fixture.componentInstance.inverse.set(true);
    fixture.detectChanges();
    expect($('.govuk-service-navigation').classList).toContain(
      'govuk-service-navigation--inverse',
    );
  });

  it('puts slot content where GOV.UK Frontend does', async () => {
    stubScreen(true);
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(SlotsHostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const container = element.querySelector(
      '.govuk-width-container',
    ) as HTMLElement;

    // Slot content makes it a landmark, even without a service name.
    expect(element.querySelector('section.govuk-service-navigation')).not.toBe(
      null,
    );
    expect(
      Array.from(container.children).map(
        (child) => child.id || child.className,
      ),
    ).toEqual(['start', 'govuk-service-navigation__container', 'end']);
    expect(
      Array.from(element.querySelectorAll('#navigation > li')).map(
        (li) => li.id,
      ),
    ).toEqual(['first', 'last']);
    expect(element.querySelector('#first')?.classList).toContain(
      'govuk-service-navigation__item',
    );
    expect(container.classList).not.toContain(
      'govuk-service-navigation__inlining-container',
    );

    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();
    expect(container.classList).toContain(
      'govuk-service-navigation__inlining-container',
    );
  });
});
