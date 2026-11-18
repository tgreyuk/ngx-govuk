import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PageMetaStrategy } from './page-meta.strategy';

@Component({ template: '' })
class PageComponent {}

describe('PageMetaStrategy', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: PageComponent },
          {
            path: 'support',
            component: PageComponent,
            title: 'Help and support',
            data: { description: 'Get help.' },
          },
          {
            path: 'components',
            children: [
              {
                path: ':componentId',
                component: PageComponent,
                data: { tab: 'overview' },
              },
              {
                path: ':componentId/api',
                component: PageComponent,
                data: { tab: 'api' },
              },
            ],
          },
        ]),
        { provide: TitleStrategy, useClass: PageMetaStrategy },
      ],
    });
    harness = await RouterTestingHarness.create();
  });

  const title = () => TestBed.inject(Title).getTitle();
  const meta = (selector: string) =>
    TestBed.inject(Meta).getTag(selector)?.content;
  const canonical = () =>
    TestBed.inject(DOCUMENT)
      .head.querySelector('link[rel="canonical"]')
      ?.getAttribute('href');

  it('gives the home page the site title and canonical root', async () => {
    await harness.navigateByUrl('/');

    expect(title()).toBe(
      'ngx-govuk: Angular components for the GOV.UK Design System',
    );
    expect(canonical()).toBe('https://www.ngx-govuk.org/');
  });

  it("uses a route's title and description", async () => {
    await harness.navigateByUrl('/support?tab=1#versions');

    expect(title()).toBe('Help and support – ngx-govuk');
    expect(meta('name="description"')).toBe('Get help.');
    expect(meta('property="og:title"')).toBe('Help and support – ngx-govuk');
    expect(canonical()).toBe('https://www.ngx-govuk.org/support');
  });

  it("takes a component page's title and description from its data", async () => {
    await harness.navigateByUrl('/components/button');

    expect(title()).toBe('Button – Components – ngx-govuk');
    expect(meta('name="description"')).toContain('carry out an action');
    expect(meta('name="robots"')).toBeUndefined();
  });

  it('names the API tab in the title', async () => {
    await harness.navigateByUrl('/components/button/api');

    expect(title()).toBe('Button API – Components – ngx-govuk');
    expect(canonical()).toBe('https://www.ngx-govuk.org/components/button/api');
  });

  it('keeps unknown components out of search results', async () => {
    await harness.navigateByUrl('/components/not-a-component');

    expect(title()).toBe('Component not found – ngx-govuk');
    expect(meta('name="robots"')).toBe('noindex');
  });
});
