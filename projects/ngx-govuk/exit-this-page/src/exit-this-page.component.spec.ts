import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukExitThisPage } from './exit-this-page.component';

@Component({
  imports: [NgxGovukExitThisPage],
  template: `
    @if (customText()) {
      <ngx-govuk-exit-this-page redirectUrl="#exited">
        Leave this page
      </ngx-govuk-exit-this-page>
    } @else {
      <ngx-govuk-exit-this-page redirectUrl="#exited" />
    }
  `,
})
class TestHostComponent {
  customText = signal(false);
}

@Component({
  imports: [NgxGovukExitThisPage],
  template: `
    <ngx-govuk-exit-this-page [redirectUrl]="redirectUrl()" />
    @if (second()) {
      <ngx-govuk-exit-this-page redirectUrl="#second" />
    }
  `,
})
class TwoButtonsHostComponent {
  redirectUrl = signal('#first');
  second = signal(true);
}

async function setup() {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  const element = fixture.nativeElement as HTMLElement;
  const $ = (selector: string) =>
    element.querySelector(selector) as HTMLElement;
  const press = (key: string, shiftKey = false) => {
    document.dispatchEvent(new KeyboardEvent('keyup', { key, shiftKey }));
    fixture.detectChanges();
  };
  const lightsOn = () =>
    element.querySelectorAll('.govuk-exit-this-page__indicator-light--on')
      .length;
  return { fixture, element, $, press, lightsOn };
}

const overlay = () =>
  document.querySelector('.govuk-exit-this-page-overlay') as HTMLElement;

describe('NgxGovukExitThisPage', () => {
  beforeEach(() => history.replaceState(null, '', '#'));
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
  });

  it('matches the GOV.UK markup snapshot', async () => {
    expect((await setup()).element).toMatchSnapshot();
  });

  it('hides the page and leaves it when clicked', async () => {
    const { $ } = await setup();
    $('a').click();
    expect(document.body.classList).toContain(
      'govuk-exit-this-page-hide-content',
    );
    expect(overlay().getAttribute('role')).toBe('alert');
    expect(overlay().textContent).toBe('Loading.');
    expect(location.hash).toBe('#exited');
  });

  it('leaves the page when users press Space on it', async () => {
    const { $ } = await setup();
    const event = new KeyboardEvent('keydown', {
      key: ' ',
      cancelable: true,
    });
    $('a').dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(overlay().textContent).toBe('Loading.');
    expect(location.hash).toBe('#exited');
  });

  it('goes to the BBC weather forecast if redirectUrl is empty', async () => {
    const fixture = TestBed.createComponent(TwoButtonsHostComponent);
    fixture.componentInstance.redirectUrl.set('');
    fixture.componentInstance.second.set(false);
    fixture.detectChanges();
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://www.bbc.co.uk/weather');
  });

  it('counts Shift presses once with two buttons on the page', async () => {
    const fixture = TestBed.createComponent(TwoButtonsHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const press = () => {
      document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift' }));
      fixture.detectChanges();
    };

    press();
    expect(
      element.querySelectorAll('.govuk-exit-this-page__indicator--visible'),
    ).toHaveLength(1);
    press();
    press();
    expect(
      document.querySelectorAll('.govuk-exit-this-page-overlay'),
    ).toHaveLength(1);
    expect(location.hash).toBe('#second');

    history.replaceState(null, '', '#');
    window.dispatchEvent(new Event('pageshow'));
    fixture.componentInstance.second.set(false);
    fixture.detectChanges();
    press();
    press();
    press();
    expect(location.hash).toBe('#first');
  });

  it('shows the page again when users come back to it', async () => {
    const { $ } = await setup();
    $('a').click();
    window.dispatchEvent(new Event('pageshow'));
    expect(document.body.classList).not.toContain(
      'govuk-exit-this-page-hide-content',
    );
    expect(overlay()).toBeNull();
  });

  it('leaves the page when users press Shift three times', async () => {
    const { $, press, lightsOn } = await setup();
    const status = () => $('[role="status"]').textContent;

    press('Shift');
    expect(lightsOn()).toBe(1);
    expect($('.govuk-exit-this-page__indicator').classList).toContain(
      'govuk-exit-this-page__indicator--visible',
    );
    expect(status()).toBe('Shift, press 2 more times to exit.');

    press('Shift');
    expect(lightsOn()).toBe(2);
    expect(status()).toBe('Shift, press 1 more time to exit.');

    press('Shift');
    expect(lightsOn()).toBe(0);
    expect(location.hash).toBe('#exited');
  });

  it('starts counting again after another key, or after 5 seconds', async () => {
    vi.useFakeTimers();
    const { $, press, lightsOn, fixture } = await setup();
    const status = () => $('[role="status"]').textContent;

    press('Shift');
    press('a');
    expect(lightsOn()).toBe(0);
    expect(status()).toBe('Exit this page expired.');

    press('Shift');
    vi.advanceTimersByTime(5000);
    fixture.detectChanges();
    expect(lightsOn()).toBe(0);
    expect(status()).toBe('Exit this page expired.');

    vi.advanceTimersByTime(5000);
    fixture.detectChanges();
    expect(status()).toBe('');
    expect(location.hash).not.toBe('#exited');
  });

  it("doesn't count Shift pressed with another key", async () => {
    const { press, lightsOn } = await setup();
    press('A', true);
    press('Shift');
    expect(lightsOn()).toBe(0);
  });

  it('can have its own text', async () => {
    const { fixture, $ } = await setup();
    fixture.componentInstance.customText.set(true);
    fixture.detectChanges();
    expect($('a').textContent?.trim()).toBe('Leave this page');
  });
});
