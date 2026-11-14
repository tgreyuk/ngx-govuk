import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukButton, NgxGovukButtonGroup } from 'ngx-govuk/button';
import { NgxGovukCookieBanner } from './cookie-banner.component';
import { NgxGovukCookieBannerMessage } from './cookie-banner-message.component';

@Component({
  imports: [
    NgxGovukCookieBanner,
    NgxGovukCookieBannerMessage,
    NgxGovukButton,
    NgxGovukButtonGroup,
  ],
  template: `<ngx-govuk-cookie-banner>
    @if (!accepted()) {
      <div ngxGovukCookieBannerMessage heading="Cookies on this service">
        <p class="govuk-body">We use some essential cookies.</p>
        <ngx-govuk-button-group>
          <button ngxGovukButton type="button" (click)="accepted.set(true)">
            Accept analytics cookies
          </button>
          <a class="govuk-link" href="/cookies">View cookies</a>
        </ngx-govuk-button-group>
      </div>
    } @else {
      <div ngxGovukCookieBannerMessage confirmation>
        <p class="govuk-body">You've accepted analytics cookies.</p>
      </div>
    }
  </ngx-govuk-cookie-banner>`,
})
class TestHostComponent {
  accepted = signal(false);
}

async function setup() {
  const fixture = TestBed.createComponent(TestHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  const element = fixture.nativeElement as HTMLElement;
  const $ = (selector: string) =>
    element.querySelector(selector) as HTMLElement;
  return { fixture, element, $ };
}

describe('NgxGovukCookieBanner', () => {
  afterEach(() => document.body.replaceChildren());

  it('matches the GOV.UK markup snapshot', async () => {
    expect((await setup()).element).toMatchSnapshot();
  });

  it('labels the banner region', async () => {
    const banner = (await setup()).$('.govuk-cookie-banner');
    expect(banner.getAttribute('role')).toBe('region');
    expect(banner.getAttribute('aria-label')).toBe('Cookie banner');
  });

  it('announces the confirmation and moves focus to it', async () => {
    const { fixture, $ } = await setup();
    const question = $('.govuk-cookie-banner__message');
    expect(question.getAttribute('role')).toBeNull();
    expect(question.hasAttribute('tabindex')).toBe(false);

    $('button').click();
    fixture.detectChanges();
    await fixture.whenStable();
    const confirmation = $('.govuk-cookie-banner__message');
    expect(confirmation.getAttribute('role')).toBe('alert');
    expect(confirmation.getAttribute('tabindex')).toBe('-1');
    expect(confirmation.querySelector('h2')).toBeNull();
    expect(document.activeElement).toBe(confirmation);
  });
});
