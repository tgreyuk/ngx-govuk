import { APP_BASE_HREF, Location, PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  NgxGovukErrorSummary,
  NgxGovukErrorSummaryItem,
} from './error-summary.component';

@Component({
  imports: [NgxGovukErrorSummary],
  template: `<ngx-govuk-error-summary
      [errorList]="errors"
      [descriptionText]="description()"
      [disableAutoFocus]="disableAutoFocus()"
    />
    <label for="event-name">What is the name of the event?</label>
    <input id="event-name" type="text" />
    <input id="unlabelled" type="text" aria-label="Unlabelled" />
    <fieldset>
      <legend>Where do you live?</legend>
      <input id="where-do-you-live" type="radio" />
    </fieldset>`,
})
class TestHostComponent {
  errors: NgxGovukErrorSummaryItem[] = [
    { text: 'Enter the name of the event', fieldId: 'event-name' },
    { text: 'Select where you live', fieldId: 'where-do-you-live' },
    { text: 'Enter a value', fieldId: 'unlabelled' },
    { text: 'The service is not available' },
  ];
  description = signal<string | undefined>(undefined);
  disableAutoFocus = signal(false);
}

describe('NgxGovukErrorSummary', () => {
  // The app is served from /app/, and the summary is on /apply/details.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_BASE_HREF, useValue: '/app/' },
        {
          provide: PlatformLocation,
          useFactory: () =>
            new MockPlatformLocation({
              startUrl: 'http://localhost/app/apply/details?step=2',
            }),
        },
      ],
    });
  });

  // Waits for render hooks too, where the summary takes focus.
  async function setup(
    options: { description?: string; disableAutoFocus?: boolean } = {},
  ) {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.description.set(options.description);
    fixture.componentInstance.disableAutoFocus.set(!!options.disableAutoFocus);
    fixture.detectChanges();
    await fixture.whenStable();
    const $ = (selector: string) =>
      fixture.nativeElement.querySelector(selector) as HTMLElement;
    return { fixture, $ };
  }

  it('matches the GOV.UK markup snapshot', async () => {
    const { $ } = await setup({ disableAutoFocus: true });
    expect($('ngx-govuk-error-summary')).toMatchSnapshot();
  });

  it('lists no errors when there is only a description', async () => {
    TestBed.overrideTemplate(
      TestHostComponent,
      `<ngx-govuk-error-summary descriptionText="Fix the errors below." disableAutoFocus />`,
    );
    const { $ } = await setup();
    expect($('.govuk-error-summary__body p').textContent).toBe(
      'Fix the errors below.',
    );
    expect($('.govuk-error-summary__list')).toBeNull();
  });

  it('shows a projected description and handles its links', async () => {
    TestBed.overrideTemplate(
      TestHostComponent,
      `<ngx-govuk-error-summary disableAutoFocus>
        <p>Check <a href="#event-name">the event name</a>.</p>
      </ngx-govuk-error-summary>
      <label for="event-name">What is the name of the event?</label>
      <input id="event-name" type="text" />`,
    );
    const { $ } = await setup();
    expect($('.govuk-error-summary__body > p').textContent).toBe(
      'Check the event name.',
    );
    $('label').scrollIntoView = vi.fn();

    $('.govuk-error-summary__body a').click();

    expect(document.activeElement).toBe($('#event-name'));
  });

  it('shows a description', async () => {
    const { $ } = await setup({
      description: 'Fix the errors below.',
      disableAutoFocus: true,
    });
    expect($('.govuk-error-summary__body p').textContent).toBe(
      'Fix the errors below.',
    );
  });

  it('takes focus when it appears', async () => {
    const { $ } = await setup();
    const summary = $('.govuk-error-summary');
    expect(document.activeElement).toBe(summary);
    expect(summary.getAttribute('tabindex')).toBe('-1');

    summary.blur();
    expect(summary.hasAttribute('tabindex')).toBe(false);
  });

  it('does not take focus when disableAutoFocus is set', async () => {
    const { $ } = await setup({ disableAutoFocus: true });
    expect(document.activeElement).not.toBe($('.govuk-error-summary'));
  });

  it('moves focus to a field and shows its label', async () => {
    const { $ } = await setup({ disableAutoFocus: true });
    const label = $('label');
    const scrollIntoView = vi.fn();
    label.scrollIntoView = scrollIntoView;

    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    $('a[href$="#event-name"]').dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe($('#event-name'));
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('shows the legend for a radio or checkbox', async () => {
    const { $ } = await setup({ disableAutoFocus: true });
    const legend = $('legend');
    const scrollIntoView = vi.fn();
    legend.scrollIntoView = scrollIntoView;

    $('a[href$="#where-do-you-live"]').click();

    expect(document.activeElement).toBe($('#where-do-you-live'));
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('focuses a field with no label without following the link', async () => {
    const { $ } = await setup({ disableAutoFocus: true });
    const field = $('#unlabelled');
    const scrollIntoView = vi.fn();
    field.scrollIntoView = scrollIntoView;

    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    $('a[href$="#unlabelled"]').dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(field);
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('follows a link to a field that is not on the page', async () => {
    TestBed.overrideTemplate(
      TestHostComponent,
      `<ngx-govuk-error-summary disableAutoFocus
        [errorList]="[{ text: 'Missing', fieldId: 'missing' }]" />`,
    );
    const { $ } = await setup();
    // Note whether the summary let the link through, then stop jsdom
    // following it.
    let followed = false;
    const stop = (event: Event) => {
      followed = !event.defaultPrevented;
      event.preventDefault();
    };
    document.addEventListener('click', stop, { once: true });
    $('a').click();
    expect(followed).toBe(true);
  });

  it('links to the field on the current page', async () => {
    const { fixture, $ } = await setup({ disableAutoFocus: true });
    const link = () => $('.govuk-error-summary__list a');
    expect(link().getAttribute('href')).toBe(
      '/app/apply/details?step=2#event-name',
    );

    TestBed.inject(Location).go('/apply/other');
    fixture.detectChanges();
    expect(link().getAttribute('href')).toBe('/app/apply/other#event-name');
  });
});
