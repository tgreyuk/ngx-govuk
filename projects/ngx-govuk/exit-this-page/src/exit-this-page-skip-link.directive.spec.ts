import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukExitThisPage } from './exit-this-page.component';
import { NgxGovukExitThisPageSkipLink } from './exit-this-page-skip-link.directive';

@Component({
  imports: [NgxGovukExitThisPage, NgxGovukExitThisPageSkipLink],
  template: `
    <a ngxGovukExitThisPageSkipLink>Exit this page</a>
    @if (button()) {
      <ngx-govuk-exit-this-page redirectUrl="#exited" />
    }
  `,
})
class HostComponent {
  button = signal(true);
}

function setup() {
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const link = element.querySelector(
    '[ngxGovukExitThisPageSkipLink]',
  ) as HTMLAnchorElement;
  return { fixture, element, link };
}

describe('NgxGovukExitThisPageSkipLink', () => {
  beforeEach(() => history.replaceState(null, '', '#'));
  afterEach(() => TestBed.resetTestingModule());

  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().link).toMatchSnapshot();
  });

  it('exits the page the same way as the button', () => {
    const { link } = setup();
    expect(link.getAttribute('href')).toBe('#exited');
    link.click();
    expect(document.body.classList).toContain(
      'govuk-exit-this-page-hide-content',
    );
    expect(
      document.querySelector('.govuk-exit-this-page-overlay')?.textContent,
    ).toBe('Loading.');
    expect(location.hash).toBe('#exited');
  });

  it('is an ordinary link to the BBC weather forecast without a button', () => {
    const { fixture, link } = setup();
    fixture.componentInstance.button.set(false);
    fixture.detectChanges();
    expect(link.getAttribute('href')).toBe('https://www.bbc.co.uk/weather');

    let followed = false;
    // Stop jsdom trying to navigate, once the link's own handler has run.
    const stop = (event: Event) => {
      followed = !event.defaultPrevented;
      event.preventDefault();
    };
    document.addEventListener('click', stop);
    link.click();
    document.removeEventListener('click', stop);
    expect(followed).toBe(true);
    expect(document.querySelector('.govuk-exit-this-page-overlay')).toBeNull();
  });
});
