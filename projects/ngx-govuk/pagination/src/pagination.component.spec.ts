import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import {
  NgxGovukPagination,
  NgxGovukPaginationLink,
} from './pagination.component';

@Component({
  imports: [NgxGovukPagination],
  template: `<ngx-govuk-pagination
    [currentPage]="current()"
    [totalPages]="total()"
  />`,
})
class NumberedHostComponent {
  current = signal(2);
  total = signal<number | undefined>(3);
}

@Component({
  imports: [NgxGovukPagination],
  template: `<ngx-govuk-pagination [previous]="previous" [next]="next" />`,
})
class BlockHostComponent {
  previous: NgxGovukPaginationLink = {
    routerLink: '/guide/eligibility',
    labelText: 'Applying for a provisional lorry or bus licence',
  };
  next: NgxGovukPaginationLink = { routerLink: '/guide/how-to-apply' };
}

function setup<T>(host: new () => T) {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(host);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const pages = () =>
    Array.from(element.querySelectorAll('.govuk-pagination__item')).map(
      (item) => item.textContent?.trim(),
    );
  return { fixture, element, pages };
}

describe('NgxGovukPagination', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup(NumberedHostComponent).element).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot for block pagination', () => {
    expect(setup(BlockHostComponent).element).toMatchSnapshot();
  });

  it('shows the first, last and nearby pages, with gaps', () => {
    const { fixture, pages } = setup(NumberedHostComponent);
    fixture.componentInstance.total.set(42);
    fixture.componentInstance.current.set(7);
    fixture.detectChanges();
    expect(pages()).toEqual(['1', '⋯', '6', '7', '8', '⋯', '42']);
  });

  it('shows a single missing page instead of a gap', () => {
    const { fixture, pages } = setup(NumberedHostComponent);
    fixture.componentInstance.total.set(10);
    fixture.componentInstance.current.set(3);
    fixture.detectChanges();
    expect(pages()).toEqual(['1', '2', '3', '4', '⋯', '10']);
  });

  it('leaves out previous on the first page and next on the last', () => {
    const { fixture, element } = setup(NumberedHostComponent);
    fixture.componentInstance.current.set(1);
    fixture.detectChanges();
    expect(element.querySelector('.govuk-pagination__prev')).toBeNull();
    expect(element.querySelector('.govuk-pagination__next')).not.toBeNull();

    fixture.componentInstance.current.set(3);
    fixture.detectChanges();
    expect(element.querySelector('.govuk-pagination__prev')).not.toBeNull();
    expect(element.querySelector('.govuk-pagination__next')).toBeNull();
  });

  it('shows nothing when there is only one page', () => {
    const { fixture, element } = setup(NumberedHostComponent);
    fixture.componentInstance.total.set(1);
    fixture.componentInstance.current.set(1);
    fixture.detectChanges();
    expect(element.querySelector('nav')).toBeNull();
  });

  it('links to each page with a query parameter, keeping the others', async () => {
    const { fixture, element } = setup(NumberedHostComponent);
    await TestBed.inject(Router).navigateByUrl('/?q=tax&page=2');
    fixture.detectChanges();
    const current = element.querySelector('[aria-current="page"]');
    expect(current?.textContent).toBe('2');
    expect(element.querySelector('[rel="next"]')?.getAttribute('href')).toBe(
      '/?q=tax&page=3',
    );
  });
});
