import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  NgxGovukFooter,
  NgxGovukFooterLink,
  NgxGovukFooterMeta,
  NgxGovukFooterSection,
} from './footer.component';

@Component({
  imports: [NgxGovukFooter, NgxGovukFooterMeta],
  template: `<ngx-govuk-footer
    [navigation]="navigation()"
    [metaLinks]="metaLinks()"
    [contentLicence]="contentLicence()"
  >
    @if (showMeta()) {
      <div ngxGovukFooterMeta>Built by the Juggling Office</div>
    }
  </ngx-govuk-footer>`,
})
class TestHostComponent {
  navigation = signal<NgxGovukFooterSection[]>([
    {
      title: 'Services and information',
      width: 'two-thirds',
      columns: 2,
      items: [
        { text: 'Benefits', href: 'https://www.gov.uk/browse/benefits' },
        { text: 'Business', href: 'https://www.gov.uk/browse/business' },
      ],
    },
    {
      title: 'Departments and policy',
      width: 'one-third',
      items: [{ text: 'Departments', href: 'https://www.gov.uk/government' }],
    },
  ]);
  metaLinks = signal<NgxGovukFooterLink[]>([
    { text: 'Help', routerLink: '/help' },
    { text: 'Cookies', routerLink: ['/cookies'] },
  ]);
  contentLicence = signal(true);
  showMeta = signal(true);
}

function setup() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  return { fixture, element };
}

describe('NgxGovukFooter', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().element).toMatchSnapshot();
  });

  it('links to routes and to other sites', () => {
    const hrefs = Array.from(
      setup().element.querySelectorAll('.govuk-footer__link'),
    ).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      'https://www.gov.uk/browse/benefits',
      'https://www.gov.uk/browse/business',
      'https://www.gov.uk/government',
      '/help',
      '/cookies',
      'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/',
      'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
    ]);
  });

  it('leaves out the navigation and its section break without sections', () => {
    const { fixture, element } = setup();
    fixture.componentInstance.navigation.set([]);
    fixture.detectChanges();
    expect(element.querySelector('.govuk-footer__navigation')).toBeNull();
    expect(element.querySelector('hr')).toBeNull();
  });

  it('has a hidden heading only with support links or content', () => {
    const { fixture, element } = setup();
    const heading = () => element.querySelector('h2.govuk-visually-hidden');
    expect(heading()?.textContent).toBe('Support links');

    fixture.componentInstance.metaLinks.set([]);
    fixture.detectChanges();
    expect(heading()).not.toBeNull();
    expect(element.querySelector('.govuk-footer__inline-list')).toBeNull();

    fixture.componentInstance.showMeta.set(false);
    fixture.detectChanges();
    expect(heading()).toBeNull();
  });

  it('can leave out the content licence', () => {
    const { fixture, element } = setup();
    fixture.componentInstance.contentLicence.set(false);
    fixture.detectChanges();
    expect(element.querySelector('.govuk-footer__licence-logo')).toBeNull();
    expect(
      element.querySelector('.govuk-footer__licence-description'),
    ).toBeNull();
  });
});
