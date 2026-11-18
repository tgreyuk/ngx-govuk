import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukNotificationBanner } from './notification-banner.component';
import {
  NgxGovukNotificationBannerHeading,
  NgxGovukNotificationBannerLink,
} from './notification-banner-content.directives';

@Component({
  imports: [
    NgxGovukNotificationBanner,
    NgxGovukNotificationBannerHeading,
    NgxGovukNotificationBannerLink,
  ],
  template: `<ngx-govuk-notification-banner titleId="banner-title">
    <p ngxGovukNotificationBannerHeading>
      This publication was withdrawn on 7 March 2014.
      <a ngxGovukNotificationBannerLink href="/withdrawn">Find out why</a>
    </p>
  </ngx-govuk-notification-banner>`,
})
class ImportantHostComponent {}

@Component({
  imports: [NgxGovukNotificationBanner, NgxGovukNotificationBannerHeading],
  template: `<ngx-govuk-notification-banner
    bannerType="success"
    titleId="banner-title"
  >
    <p ngxGovukNotificationBannerHeading>Email sent to example&#64;email.com</p>
  </ngx-govuk-notification-banner>`,
})
class SuccessHostComponent {}

@Component({
  imports: [NgxGovukNotificationBanner],
  template: `<ngx-govuk-notification-banner
    bannerType="success"
    [disableAutoFocus]="true"
  >
    Saved
  </ngx-govuk-notification-banner>`,
})
class NoFocusHostComponent {}

@Component({
  imports: [NgxGovukNotificationBanner],
  template: `<ngx-govuk-notification-banner role="alert">
      Your session will end in 2 minutes
    </ngx-govuk-notification-banner>
    <ngx-govuk-notification-banner bannerType="success" role="status">
      Saved
    </ngx-govuk-notification-banner>`,
})
class RoleHostComponent {}

@Component({
  imports: [NgxGovukNotificationBanner],
  template: `<ngx-govuk-notification-banner>One</ngx-govuk-notification-banner>
    <ngx-govuk-notification-banner>Two</ngx-govuk-notification-banner>`,
})
class TwoBannersHostComponent {}

// Waits for render hooks too, where a success banner takes focus.
async function render<T>(host: new () => T) {
  const fixture = TestBed.createComponent(host);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

describe('NgxGovukNotificationBanner', () => {
  it('matches the GOV.UK markup snapshot', async () => {
    expect(
      (await render(ImportantHostComponent)).nativeElement,
    ).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot for a success banner', async () => {
    const fixture = await render(SuccessHostComponent);
    // Focus adds a temporary tabindex; leave it out of the snapshot.
    (document.activeElement as HTMLElement | null)?.blur();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('focuses a success banner when it renders', async () => {
    const fixture = await render(SuccessHostComponent);
    const banner = fixture.nativeElement.querySelector('[role="alert"]');
    expect(document.activeElement).toBe(banner);
    expect(banner.getAttribute('tabindex')).toBe('-1');

    banner.blur();
    expect(banner.hasAttribute('tabindex')).toBe(false);
  });

  it("doesn't focus a success banner with auto focus turned off", async () => {
    const fixture = await render(NoFocusHostComponent);
    const banner = fixture.nativeElement.querySelector('[role="alert"]');
    expect(document.activeElement).not.toBe(banner);
  });

  it('styles the heading and links inside it', async () => {
    const fixture = await render(ImportantHostComponent);
    const content: HTMLElement = fixture.nativeElement.querySelector(
      '.govuk-notification-banner__content',
    );
    expect(content.querySelector('p')?.className).toBe(
      'govuk-notification-banner__heading',
    );
    expect(content.querySelector('a')?.className).toBe(
      'govuk-notification-banner__link',
    );
  });

  it('takes its role from role, and focuses it when that is alert', async () => {
    const fixture = await render(RoleHostComponent);
    const banners: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.govuk-notification-banner'),
    );
    expect(banners.map((banner) => banner.getAttribute('role'))).toEqual([
      'alert',
      'status',
    ]);
    expect(banners[1].classList).toContain(
      'govuk-notification-banner--success',
    );
    expect(document.activeElement).toBe(banners[0]);
  });

  it('gives each banner its own title id', async () => {
    const fixture = await render(TwoBannersHostComponent);
    const banners: HTMLElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="region"]'),
    );
    const ids = banners.map((banner) => banner.getAttribute('aria-labelledby'));
    expect(ids[0]).not.toBe(ids[1]);
    banners.forEach((banner, i) =>
      expect(banner.querySelector('h2')?.id).toBe(ids[i]),
    );
  });
});
