import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideNgxGovuk } from './provide-ngx-govuk';

describe('provideNgxGovuk', () => {
  const html = document.documentElement.classList;
  const body = document.body.classList;

  afterEach(() => {
    html.remove('govuk-template');
    body.remove('govuk-template__body', 'govuk-frontend-supported', 'app-body');
  });

  function setUp(platform?: string) {
    TestBed.configureTestingModule({
      providers: [
        provideNgxGovuk(),
        ...(platform ? [{ provide: PLATFORM_ID, useValue: platform }] : []),
      ],
    });
    TestBed.inject(DOCUMENT);
  }

  it('adds the page template classes and govuk-frontend-supported in the browser', () => {
    setUp();

    expect(html).toContain('govuk-template');
    expect(body).toContain('govuk-template__body');
    expect(body).toContain('govuk-frontend-supported');
  });

  it('keeps the classes already on the body', () => {
    body.add('app-body');
    setUp();

    expect(body).toContain('app-body');
    expect(body).toContain('govuk-template__body');
  });

  it('adds only the page template classes during server-side rendering', () => {
    setUp('server');

    expect(html).toContain('govuk-template');
    expect(body).toContain('govuk-template__body');
    expect(body).not.toContain('govuk-frontend-supported');
  });
});
