import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukSkipLink } from './skip-link.directive';

@Component({
  imports: [NgxGovukSkipLink],
  template: `<a href="#main-content" ngxGovukSkipLink>Skip to main content</a>
    <main id="main-content">Content</main>`,
})
class TestHostComponent {}

describe('NgxGovukSkipLink', () => {
  function setup() {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const main = fixture.nativeElement.querySelector('main') as HTMLElement;
    return { fixture, link, main };
  }

  it('matches the GOV.UK markup snapshot', () => {
    const { fixture } = setup();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('moves focus to the main content instead of following the link', () => {
    const { link, main } = setup();
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(main);
    expect(main.getAttribute('tabindex')).toBe('-1');
    expect(main.classList).toContain('govuk-skip-link-focused-element');
  });

  it('tidies up when the main content loses focus', () => {
    const { link, main } = setup();
    link.click();
    main.blur();

    expect(main.hasAttribute('tabindex')).toBe(false);
    expect(main.classList).not.toContain('govuk-skip-link-focused-element');
  });
});
