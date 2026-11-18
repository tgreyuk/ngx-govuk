import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukBreadcrumbsItem } from './breadcrumbs-item.directive';
import { NgxGovukBreadcrumbs } from './breadcrumbs.component';

@Component({
  imports: [NgxGovukBreadcrumbs, NgxGovukBreadcrumbsItem],
  template: `<nav ngxGovukBreadcrumbs>
    <a *ngxGovukBreadcrumbsItem href="#">Home</a>
    <a *ngxGovukBreadcrumbsItem href="#">Travel abroad</a>
  </nav>`,
})
class TestHostComponent {}

describe('NgxGovukBreadcrumbs', () => {
  it('should render default state', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav')).toMatchSnapshot();
  });
});

@Component({
  imports: [NgxGovukBreadcrumbs, NgxGovukBreadcrumbsItem],
  template: `<nav
    ngxGovukBreadcrumbs
    id="crumbs"
    class="govuk-!-margin-bottom-0"
    collapseOnMobile
    inverse
    labelText="You are here"
  >
    @for (crumb of crumbs(); track crumb) {
      <a *ngxGovukBreadcrumbsItem href="#">{{ crumb }}</a>
    }
  </nav>`,
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
    expect(Array.from(nav().classList).sort()).toEqual([
      'govuk-!-margin-bottom-0',
      'govuk-breadcrumbs',
      'govuk-breadcrumbs--collapse-on-mobile',
      'govuk-breadcrumbs--inverse',
    ]);
    expect(nav().getAttribute('aria-label')).toBe('You are here');
  });

  it('keeps the attributes and classes set on the nav', () => {
    expect(nav().id).toBe('crumbs');
    expect(nav().classList).toContain('govuk-!-margin-bottom-0');
  });
});
