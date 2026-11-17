import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukSummaryActionLink } from './summary-action-link.component';
import { NgxGovukSummaryListAction } from './summary-list-action.directive';
import { NgxGovukSummaryListRow } from './summary-list-row.component';
import { NgxGovukSummaryList } from './summary-list.directive';

const imports = [
  NgxGovukSummaryList,
  NgxGovukSummaryListRow,
  NgxGovukSummaryListAction,
  NgxGovukSummaryActionLink,
];

@Component({
  imports: [NgxGovukSummaryList, NgxGovukSummaryListRow],
  template: `<dl ngxGovukSummaryList>
    <div ngxGovukSummaryListRow key="Name">Sarah Phillips</div>
    <div ngxGovukSummaryListRow key="Date of birth">5 January 1978</div>
  </dl>`,
})
class DefaultHostComponent {}

@Component({
  imports,
  template: `<dl ngxGovukSummaryList>
    <div ngxGovukSummaryListRow key="Name">
      Sarah Phillips
      <a
        *ngxGovukSummaryListAction
        ngxGovukSummaryActionLink
        visuallyHiddenText="name"
        href="/name"
        >Change</a
      >
    </div>
    <div ngxGovukSummaryListRow key="Contact details">
      <p class="govuk-body">sarah.phillips&#64;example.com</p>
      <a
        *ngxGovukSummaryListAction
        ngxGovukSummaryActionLink
        visuallyHiddenText="contact details"
        href="/contact/edit"
        >Edit</a
      >
      <a
        *ngxGovukSummaryListAction
        ngxGovukSummaryActionLink
        visuallyHiddenText="contact details"
        href="/contact/delete"
        >Delete</a
      >
    </div>
    <div ngxGovukSummaryListRow key="Reference">ABC123</div>
  </dl>`,
})
class ActionsHostComponent {}

@Component({
  imports,
  template: `<dl ngxGovukSummaryList>
    <div ngxGovukSummaryListRow key="Name">
      Sarah Phillips
      <a *ngxGovukSummaryListAction ngxGovukSummaryActionLink href="/name"
        >Change name</a
      >
    </div>
  </dl>`,
})
class NoHiddenTextHostComponent {}

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

  it('leaves the hidden text as it is outside a card', () => {
    const hidden = render(ActionsHostComponent).querySelectorAll(
      '.govuk-visually-hidden',
    );
    expect(Array.from(hidden).map((span) => span.textContent)).toEqual([
      ' name',
      ' contact details',
      ' contact details',
    ]);
  });

  it('adds the govuk-link class to action links', () => {
    const links = render(ActionsHostComponent).querySelectorAll('a');
    for (const link of Array.from(links)) {
      expect(link.classList).toContain('govuk-link');
    }
  });

  it('leaves out the hidden text when there is none', () => {
    const link = render(NoHiddenTextHostComponent).querySelector('a');
    expect(link?.querySelector('.govuk-visually-hidden')).toBeNull();
    expect(link?.textContent).toBe('Change name');
  });

  it('marks rows without actions only when another row has them', () => {
    const noActions = '.govuk-summary-list__row--no-actions';
    expect(render(DefaultHostComponent).querySelector(noActions)).toBeNull();

    const rows = render(ActionsHostComponent).querySelectorAll(noActions);
    expect(rows).toHaveLength(1);
    expect(rows[0].querySelector('dt')?.textContent).toBe('Reference');
  });
});
