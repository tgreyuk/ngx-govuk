import { Component, signal } from '@angular/core';
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
    history.replaceState(null, '', location.pathname);
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

  it('scrolls to a section instead of opening it on a small screen', () => {
    stubScreen(false);
    const { fixture, element, links, hidden } = setup();
    const panel = element.querySelector<HTMLElement>('#past-month')!;
    panel.scrollIntoView = vi.fn();
    links()[2].click();
    fixture.detectChanges();
    expect(panel.scrollIntoView).toHaveBeenCalled();
    expect(fixture.componentInstance.selected()).toBe(0);
    expect(hidden()).toEqual([false, true, true]);
  });

  it('opens the tab the URL fragment points to', async () => {
    stubScreen(true);
    history.replaceState(null, '', '#past-week');
    const { fixture } = setup();
    await fixture.whenStable();
    expect(fixture.componentInstance.selected()).toBe(1);
  });
});
