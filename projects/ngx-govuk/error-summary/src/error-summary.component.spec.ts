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
      [description]="description()"
      [disableAutoFocus]="disableAutoFocus()"
    />
    <label for="event-name">What is the name of the event?</label>
    <input id="event-name" type="text" />
    <fieldset>
      <legend>Where do you live?</legend>
      <input id="where-do-you-live" type="radio" />
    </fieldset>`,
})
class TestHostComponent {
  errors: NgxGovukErrorSummaryItem[] = [
    { text: 'Enter the name of the event', href: '#event-name' },
    { text: 'Select where you live', href: '#where-do-you-live' },
    { text: 'The service is not available' },
  ];
  description = signal<string | undefined>(undefined);
  disableAutoFocus = signal(false);
}

describe('NgxGovukErrorSummary', () => {
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
    $('a[href="#event-name"]').dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe($('#event-name'));
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('shows the legend for a radio or checkbox', async () => {
    const { $ } = await setup({ disableAutoFocus: true });
    const legend = $('legend');
    const scrollIntoView = vi.fn();
    legend.scrollIntoView = scrollIntoView;

    $('a[href="#where-do-you-live"]').click();

    expect(document.activeElement).toBe($('#where-do-you-live'));
    expect(scrollIntoView).toHaveBeenCalled();
  });
});
