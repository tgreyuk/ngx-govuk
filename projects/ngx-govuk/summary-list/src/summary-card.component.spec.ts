import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukSummaryCardAction } from './summary-card-action.directive';
import { NgxGovukSummaryCard } from './summary-card.component';
import { NgxGovukSummaryListAction } from './summary-list-action.directive';
import { NgxGovukSummaryListRow } from './summary-list-row.component';
import { NgxGovukSummaryList } from './summary-list.directive';

const imports = [
  NgxGovukSummaryCard,
  NgxGovukSummaryCardAction,
  NgxGovukSummaryList,
  NgxGovukSummaryListRow,
  NgxGovukSummaryListAction,
];

@Component({
  imports,
  template: `<ngx-govuk-summary-card [titleText]="title()">
    <a *ngxGovukSummaryCardAction class="govuk-link" href="/delete"
      >Delete job history</a
    >
    <a *ngxGovukSummaryCardAction class="govuk-link" href="/withdraw"
      >Withdraw job history</a
    >
    <dl ngxGovukSummaryList>
      <div ngxGovukSummaryListRow key="Name">
        Firstname Lastname
        <a *ngxGovukSummaryListAction class="govuk-link" href="/name/edit"
          >Edit<span class="govuk-visually-hidden"> name</span></a
        >
        <a *ngxGovukSummaryListAction class="govuk-link" href="/name/delete"
          >Delete<span class="govuk-visually-hidden"> name</span></a
        >
      </div>
      <div ngxGovukSummaryListRow key="Date of birth">
        13/08/1980
        <a *ngxGovukSummaryListAction class="govuk-link" href="/dob"
          >Change<span class="govuk-visually-hidden"> date of birth</span></a
        >
      </div>
    </dl>
  </ngx-govuk-summary-card>`,
})
class ActionsHostComponent {
  title = signal('Undergraduate teaching assistant');
}

@Component({
  imports,
  template: `<ngx-govuk-summary-card
    titleText="University of Gloucestershire"
    [titleHeadingLevel]="3"
  >
    <a *ngxGovukSummaryCardAction class="govuk-link" href="/delete">Delete</a>
    <dl ngxGovukSummaryList>
      <div ngxGovukSummaryListRow key="Course">English</div>
    </dl>
  </ngx-govuk-summary-card>`,
})
class OneActionHostComponent {}

function render<T>(host: new () => T) {
  const fixture = TestBed.createComponent(host);
  fixture.detectChanges();
  return fixture;
}

const hiddenText = (element: HTMLElement) =>
  Array.from(element.querySelectorAll('a')).map(
    (link) => link.querySelector('.govuk-visually-hidden')?.textContent,
  );

describe('NgxGovukSummaryCard', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(render(ActionsHostComponent).nativeElement).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot with one card action', () => {
    expect(render(OneActionHostComponent).nativeElement).toMatchSnapshot();
  });

  it('adds the card title to every action in the card', () => {
    const element = render(ActionsHostComponent).nativeElement;
    expect(hiddenText(element)).toEqual([
      ' (Undergraduate teaching assistant)',
      ' (Undergraduate teaching assistant)',
      ' name (Undergraduate teaching assistant)',
      ' name (Undergraduate teaching assistant)',
      ' date of birth (Undergraduate teaching assistant)',
    ]);
  });

  it('updates the hidden text when the title changes', () => {
    const fixture = render(ActionsHostComponent);
    fixture.componentInstance.title.set('Lab technician');
    fixture.detectChanges();
    expect(hiddenText(fixture.nativeElement)).toEqual([
      ' (Lab technician)',
      ' (Lab technician)',
      ' name (Lab technician)',
      ' name (Lab technician)',
      ' date of birth (Lab technician)',
    ]);
  });

  it('sets the heading level', () => {
    const element = render(OneActionHostComponent).nativeElement;
    expect(
      element.querySelector('h3.govuk-summary-card__title'),
    ).not.toBeNull();
  });
});
