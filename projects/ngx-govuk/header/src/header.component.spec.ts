import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukHeader } from './header.component';

@Component({
  imports: [NgxGovukHeader],
  template: `<ngx-govuk-header
    [productName]="productName()"
    [fullWidth]="fullWidth()"
  />`,
})
class TestHostComponent {
  productName = signal<string | undefined>(undefined);
  fullWidth = signal(false);
}

function setup() {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  return { fixture, element };
}

describe('NgxGovukHeader', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().element).toMatchSnapshot();
  });

  it('links the logo to GOV.UK', () => {
    const link = setup().element.querySelector('a');
    expect(link?.getAttribute('href')).toBe('//gov.uk');
    expect(link?.querySelector('svg')?.getAttribute('aria-label')).toBe(
      'GOV.UK',
    );
  });

  it('shows a product name', () => {
    const { fixture, element } = setup();
    fixture.componentInstance.productName.set('Design System');
    fixture.detectChanges();
    expect(
      element.querySelector('.govuk-header__product-name')?.textContent,
    ).toBe('Design System');
  });

  it('spans the full width', () => {
    const { fixture, element } = setup();
    fixture.componentInstance.fullWidth.set(true);
    fixture.detectChanges();
    const container = element.querySelector('.govuk-header__container');
    expect(container?.classList).toContain(
      'govuk-header__container--full-width',
    );
    expect(container?.classList).not.toContain('govuk-width-container');
  });
});
