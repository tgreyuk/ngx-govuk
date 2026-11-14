import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NgxGovukGenericHeader } from './generic-header.component';

@Component({
  imports: [NgxGovukGenericHeader],
  template: `<ngx-govuk-generic-header
    [homepageLink]="homepageLink()"
    [fullWidth]="fullWidth()"
    >My cool service</ngx-govuk-generic-header
  >`,
})
class TestHostComponent {
  homepageLink = signal<string>('/');
  fullWidth = signal(false);
}

function setup() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  return { fixture, element };
}

describe('NgxGovukGenericHeader', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().element).toMatchSnapshot();
  });

  it('links its content to the homepage', () => {
    const { fixture, element } = setup();
    const link = element.querySelector('a');
    expect(link?.textContent).toBe('My cool service');
    expect(link?.getAttribute('href')).toBe('/');

    fixture.componentInstance.homepageLink.set('/start');
    fixture.detectChanges();
    expect(link?.getAttribute('href')).toBe('/start');
  });

  it('spans the full width', () => {
    const { fixture, element } = setup();
    fixture.componentInstance.fullWidth.set(true);
    fixture.detectChanges();
    const container = element.querySelector('.govuk-generic-header__container');
    expect(container?.classList).toContain(
      'govuk-generic-header__container--full-width',
    );
    expect(container?.classList).not.toContain('govuk-width-container');
  });
});
