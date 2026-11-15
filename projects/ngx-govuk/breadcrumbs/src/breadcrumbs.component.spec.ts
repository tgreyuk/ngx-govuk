import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukBreadcrumbsItem } from './breadcrumbs-item.directive';
import { NgxGovukBreadcrumbs } from './breadcrumbs.component';

@Component({
  imports: [NgxGovukBreadcrumbs, NgxGovukBreadcrumbsItem],
  template: `<ngx-govuk-breadcrumbs>
    <a *ngxGovukBreadcrumbsItem href="#">Home</a>
    <a *ngxGovukBreadcrumbsItem href="#">Travel abroad</a>
  </ngx-govuk-breadcrumbs>`,
})
class TestHostComponent {}

describe('NgxGovukBreadcrumbs', () => {
  it('should render default state', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('ngx-govuk-breadcrumbs'),
    ).toMatchSnapshot();
  });
});

@Component({
  imports: [NgxGovukBreadcrumbs, NgxGovukBreadcrumbsItem],
  template: `<ngx-govuk-breadcrumbs
    collapseOnMobile
    inverse
    labelText="You are here"
  >
    @for (crumb of crumbs(); track crumb) {
      <a *ngxGovukBreadcrumbsItem href="#">{{ crumb }}</a>
    }
  </ngx-govuk-breadcrumbs>`,
})
class DynamicHostComponent {
  crumbs = signal(['Home', 'Passports', 'Travel abroad']);
}

describe('NgxGovukBreadcrumbs with changing items', () => {
  let fixture: ComponentFixture<DynamicHostComponent>;

  const nav = (): HTMLElement => fixture.nativeElement.querySelector('nav');
  const items = (): string[] =>
    Array.from(
      nav().querySelectorAll('.govuk-breadcrumbs__list > li'),
      (li) => {
        const link = li.querySelector('a.govuk-breadcrumbs__link');
        return link ? link.textContent!.trim() : '(empty)';
      },
    );

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicHostComponent);
    fixture.detectChanges();
  });

  it('puts each link in its own list item', () => {
    expect(items()).toEqual(['Home', 'Passports', 'Travel abroad']);
  });

  it('keeps the list in step as links are added, removed and reordered', () => {
    fixture.componentInstance.crumbs.set(['Home', 'Travel abroad']);
    fixture.detectChanges();
    expect(items()).toEqual(['Home', 'Travel abroad']);

    fixture.componentInstance.crumbs.set(['Travel abroad', 'Home', 'Visas']);
    fixture.detectChanges();
    expect(items()).toEqual(['Travel abroad', 'Home', 'Visas']);
  });

  it('sets the options on the nav', () => {
    expect(Array.from(nav().classList)).toEqual([
      'govuk-breadcrumbs',
      'govuk-breadcrumbs--collapse-on-mobile',
      'govuk-breadcrumbs--inverse',
    ]);
    expect(nav().getAttribute('aria-label')).toBe('You are here');
  });
});
