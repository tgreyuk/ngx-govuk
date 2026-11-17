import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukTab } from './tab.component';
import { NgxGovukTabs } from './tabs.component';

@Component({ template: 'Day' })
class DayComponent {}

@Component({ template: 'Week' })
class WeekComponent {}

@Component({
  imports: [NgxGovukTabs, NgxGovukTab, RouterOutlet],
  template: `<ngx-govuk-tabs>
    <ngx-govuk-tab label="Past day" link="day" id="day" />
    <ngx-govuk-tab label="Past week" link="week" id="week" />
    <router-outlet />
  </ngx-govuk-tabs>`,
})
class ResultsComponent {}

/** Pretends the screen is tablet width or wider, or narrower. */
function stubScreen(wide: boolean) {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches: wide,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  } as unknown as MediaQueryList);
}

describe('NgxGovukTabs with routes', () => {
  beforeEach(() => {
    window.matchMedia ??= (() => undefined) as never;
    document.body.classList.add('govuk-frontend-supported');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NgxGovukUtilsService,
          useValue: { randomId: (prefix: string) => `${prefix}-someId` },
        },
        provideRouter([
          {
            path: 'results',
            component: ResultsComponent,
            children: [
              { path: 'day', component: DayComponent },
              {
                path: 'week',
                children: [
                  { path: '', component: WeekComponent },
                  { path: 'details', component: WeekComponent },
                ],
              },
            ],
          },
        ]),
      ],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.classList.remove('govuk-frontend-supported');
  });

  async function setup(url: string) {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    harness.detectChanges();
    const element: HTMLElement = harness.routeNativeElement!;
    const links = () =>
      Array.from(
        element.querySelectorAll<HTMLAnchorElement>('.govuk-tabs__tab'),
      );
    const panels = () => element.querySelectorAll('.govuk-tabs__panel');
    return { harness, element, links, panels };
  }

  it('matches the GOV.UK markup snapshot on a wide screen', async () => {
    stubScreen(true);
    const { element } = await setup('/results/week');
    expect(element.querySelector('ngx-govuk-tabs')).toMatchSnapshot();
  });

  it('links each tab to its route', async () => {
    stubScreen(true);
    const { links } = await setup('/results/day');
    expect(links().map((link) => link.getAttribute('href'))).toEqual([
      '/results/day',
      '/results/week',
    ]);
  });

  it('opens the tab for the active route, and its routes below', async () => {
    stubScreen(true);
    const { harness, links } = await setup('/results/day');
    const selected = () =>
      links().map((link) => link.getAttribute('aria-selected'));
    expect(selected()).toEqual(['true', 'false']);

    await harness.navigateByUrl('/results/week/details');
    harness.detectChanges();
    expect(selected()).toEqual(['false', 'true']);
    expect(links()[1].getAttribute('tabindex')).toBe('0');
  });

  it('shows the route in one panel, labelled by the open tab', async () => {
    stubScreen(true);
    const { panels, links } = await setup('/results/week');
    expect(panels()).toHaveLength(1);
    expect(panels()[0].textContent).toContain('Week');
    expect(panels()[0].getAttribute('aria-labelledby')).toBe(links()[1].id);
    expect(links()[0].getAttribute('aria-controls')).toBe(panels()[0].id);
  });

  it('navigates with the arrow keys and moves focus', async () => {
    stubScreen(true);
    const { harness, links } = await setup('/results/day');
    links()[0].focus();
    links()[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/results/week');
    expect(document.activeElement).toBe(links()[1]);
  });

  it('keeps the first tab reachable when no tab’s route is active', async () => {
    stubScreen(true);
    const { links } = await setup('/results');
    expect(links().map((link) => link.getAttribute('tabindex'))).toEqual([
      '0',
      '-1',
    ]);
    expect(
      links().some((link) => link.getAttribute('aria-selected') === 'true'),
    ).toBe(false);
  });
});
