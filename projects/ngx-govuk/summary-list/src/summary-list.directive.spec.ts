import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukSummaryListAction } from './summary-list-action.directive';
import { NgxGovukSummaryListRow } from './summary-list-row.component';
import { NgxGovukSummaryList } from './summary-list.directive';

const imports = [
  NgxGovukSummaryList,
  NgxGovukSummaryListRow,
  NgxGovukSummaryListAction,
];

@Component({
  imports: [NgxGovukSummaryList, NgxGovukSummaryListRow],
  template: `<dl ngxGovukSummaryList>
    <div ngxGovukSummaryListRow key="Name">Sarah Philips</div>
    <div ngxGovukSummaryListRow key="Date of birth">5 January 1978</div>
  </dl>`,
})
class DefaultHostComponent {}

@Component({
  imports,
  template: `<dl ngxGovukSummaryList>
    <div ngxGovukSummaryListRow key="Name">
      Sarah Philips
      <a *ngxGovukSummaryListAction class="govuk-link" href="/name"
        >Change<span class="govuk-visually-hidden"> name</span></a
      >
    </div>
    <div ngxGovukSummaryListRow key="Contact details">
      <p class="govuk-body">sarah.phillips&#64;example.com</p>
      <a *ngxGovukSummaryListAction class="govuk-link" href="/contact/edit"
        >Edit<span class="govuk-visually-hidden"> contact details</span></a
      >
      <a *ngxGovukSummaryListAction class="govuk-link" href="/contact/delete"
        >Delete<span class="govuk-visually-hidden"> contact details</span></a
      >
    </div>
    <div ngxGovukSummaryListRow key="Reference">ABC123</div>
  </dl>`,
})
class ActionsHostComponent {}

function render<T>(host: new () => T) {
  const fixture = TestBed.createComponent(host);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('NgxGovukSummaryList', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(render(DefaultHostComponent)).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot with actions', () => {
    expect(render(ActionsHostComponent)).toMatchSnapshot();
  });

  it('shows one action on its own, and more than one as a list', () => {
    const [name, contact] = Array.from(
      render(ActionsHostComponent).querySelectorAll(
        '.govuk-summary-list__actions',
      ),
    );
    expect(name.querySelector('ul')).toBeNull();
    expect(name.querySelectorAll('a')).toHaveLength(1);
    expect(
      contact.querySelectorAll('.govuk-summary-list__actions-list-item a'),
    ).toHaveLength(2);
  });

  it('marks rows without actions only when another row has them', () => {
    const noActions = '.govuk-summary-list__row--no-actions';
    expect(render(DefaultHostComponent).querySelector(noActions)).toBeNull();

    const rows = render(ActionsHostComponent).querySelectorAll(noActions);
    expect(rows).toHaveLength(1);
    expect(rows[0].querySelector('dt')?.textContent).toBe('Reference');
  });
});
