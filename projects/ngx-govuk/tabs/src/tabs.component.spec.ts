import { Component, signal } from '@angular/core';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NgxGovukTab } from './tab.component';
import { NgxGovukTabs } from './tabs.component';

@Component({
  imports: [NgxGovukTabs, NgxGovukTab],
  template: `<ngx-govuk-tabs [(selectedIndex)]="selected">
    <ngx-govuk-tab label="Past day" id="past-day">Day</ngx-govuk-tab>
    <ngx-govuk-tab label="Past week" id="past-week">Week</ngx-govuk-tab>
    <ngx-govuk-tab label="Past month" id="past-month">Month</ngx-govuk-tab>
  </ngx-govuk-tabs>`,
})
class TestHostComponent {
  selected = signal(0);
}

/** Pretends the screen is tablet width or wider, or narrower. */
function stubScreen(wide: boolean) {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches: wide,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  } as unknown as MediaQueryList);
}

describe('NgxGovukTabs', () => {
  function setup() {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const links = () =>
      Array.from(
        element.querySelectorAll<HTMLAnchorElement>('.govuk-tabs__tab'),
      );
    const hidden = () =>
      Array.from(element.querySelectorAll('ngx-govuk-tab')).map((panel) =>
        panel.classList.contains('govuk-tabs__panel--hidden'),
      );
    return { fixture, element, links, hidden };
  }

  beforeEach(() => {
    // matchMedia isn't in every test DOM, so give spyOn something to replace.
    window.matchMedia ??= (() => undefined) as never;
    document.body.classList.add('govuk-frontend-supported');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.classList.remove('govuk-frontend-supported');
  });

  it('matches the GOV.UK markup snapshot on a wide screen', () => {
    stubScreen(true);
    const { element } = setup();
    expect(element.querySelector('ngx-govuk-tabs')).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot on a small screen', () => {
    stubScreen(false);
    const { element } = setup();
    expect(element.querySelector('ngx-govuk-tabs')).toMatchSnapshot();
  });

  it('opens a tab when it is clicked, and writes back to the binding', () => {
    stubScreen(true);
    const { fixture, links, hidden } = setup();
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    links()[1].dispatchEvent(click);
    fixture.detectChanges();
    expect(click.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.selected()).toBe(1);
    expect(hidden()).toEqual([true, false, true]);
    expect(links()[1].getAttribute('aria-selected')).toBe('true');
    expect(links()[1].getAttribute('tabindex')).toBe('0');
    expect(links()[0].getAttribute('tabindex')).toBe('-1');
  });

  it('opens a tab from the binding', () => {
    stubScreen(true);
    const { fixture, hidden } = setup();
    fixture.componentInstance.selected.set(2);
    fixture.detectChanges();
    expect(hidden()).toEqual([true, true, false]);
  });

  it('moves between tabs with the arrow keys, stopping at the ends', () => {
    stubScreen(true);
    const { fixture, links } = setup();
    const press = (key: string) => {
      document.activeElement!.dispatchEvent(
        new KeyboardEvent('keydown', { key, bubbles: true }),
      );
      fixture.detectChanges();
    };
    links()[0].focus();
    press('ArrowLeft');
    expect(fixture.componentInstance.selected()).toBe(0);
    press('ArrowRight');
    press('ArrowRight');
    press('ArrowRight');
    expect(fixture.componentInstance.selected()).toBe(2);
    expect(document.activeElement).toBe(links()[2]);
  });

  it('leaves the links as plain links on a small screen', () => {
    stubScreen(false);
    const { fixture, links, hidden } = setup();
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    links()[2].dispatchEvent(click);
    fixture.detectChanges();
    expect(click.defaultPrevented).toBe(false);
    expect(fixture.componentInstance.selected()).toBe(0);
    expect(hidden()).toEqual([false, true, true]);
  });

  it('links to each section on the current page, not the base URL', () => {
    stubScreen(false);
    TestBed.inject(Location).go('/apply/answers?step=2');
    const { links } = setup();
    expect(links()[1].getAttribute('href')).toBe(
      '/apply/answers?step=2#past-week',
    );
  });

  it('shows a list of links without govuk-frontend-supported', () => {
    stubScreen(true);
    document.body.classList.remove('govuk-frontend-supported');
    const { element, links } = setup();
    expect(element.querySelector('[role="tablist"]')).toBeNull();
    expect(links()[1].hasAttribute('tabindex')).toBe(false);
  });

  it('adds a history entry when a tab opens', () => {
    stubScreen(true);
    const { fixture, links } = setup();
    const go = vi.spyOn(TestBed.inject(Location), 'go');
    links()[1].click();
    fixture.detectChanges();
    expect(go).toHaveBeenCalledWith('#past-week');
  });

  it('opens and focuses the tab when the URL goes back', async () => {
    stubScreen(true);
    const { fixture, links } = setup();
    await fixture.whenStable();
    links()[1].click();
    links()[2].click();
    fixture.detectChanges();
    TestBed.inject(Location).back();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected()).toBe(1);
    expect(document.activeElement).toBe(links()[1]);
  });

  it('opens the tab the URL fragment points to', async () => {
    stubScreen(true);
    TestBed.inject(Location).go('/#past-week');
    const { fixture } = setup();
    await fixture.whenStable();
    expect(fixture.componentInstance.selected()).toBe(1);
  });
});
