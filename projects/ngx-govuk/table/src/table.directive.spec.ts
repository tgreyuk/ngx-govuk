import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  NgxGovukTable,
  NgxGovukTableBody,
  NgxGovukTableCaption,
  NgxGovukTableCell,
  NgxGovukTableHead,
  NgxGovukTableHeader,
  NgxGovukTableRow,
} from './table.directive';

@Component({
  imports: [
    NgxGovukTable,
    NgxGovukTableCaption,
    NgxGovukTableHead,
    NgxGovukTableBody,
    NgxGovukTableRow,
    NgxGovukTableHeader,
    NgxGovukTableCell,
  ],
  template: `<table ngxGovukTable>
    <caption ngxGovukTableCaption captionSize="m">
      Months and rates
    </caption>
    <thead ngxGovukTableHead>
      <tr ngxGovukTableRow>
        <th ngxGovukTableHeader>Month you apply</th>
        <th ngxGovukTableHeader format="numeric">Rate for vehicles</th>
      </tr>
    </thead>
    <tbody ngxGovukTableBody>
      <tr ngxGovukTableRow>
        <th ngxGovukTableHeader>January</th>
        <td ngxGovukTableCell format="numeric">£95</td>
      </tr>
      <tr ngxGovukTableRow>
        <td ngxGovukTableCell>February</td>
        <td ngxGovukTableCell>£55</td>
      </tr>
    </tbody>
  </table>`,
})
class TestHostComponent {}

@Component({
  imports: [NgxGovukTable, NgxGovukTableCaption],
  template: `<table ngxGovukTable>
    <caption ngxGovukTableCaption [captionSize]="size()">
      Dates and amounts
    </caption>
  </table>`,
})
class OptionsHostComponent {
  size = signal<'m' | 'l' | 'xl' | undefined>('l');
}

function render() {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('NgxGovukTable', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(render()).toMatchSnapshot();
  });

  it('scopes headers to their column in the head and their row elsewhere', () => {
    const headers = Array.from(render().querySelectorAll('th'));
    expect(headers.map((th) => th.getAttribute('scope'))).toEqual([
      'col',
      'col',
      'row',
    ]);
  });

  it('changes the caption size, and leaves the modifier out when unset', () => {
    const fixture = TestBed.createComponent(OptionsHostComponent);
    fixture.detectChanges();
    const caption: HTMLElement = fixture.nativeElement.querySelector('caption');
    expect(caption.className).toBe(
      'govuk-table__caption govuk-table__caption--l',
    );

    fixture.componentInstance.size.set(undefined);
    fixture.detectChanges();
    expect(caption.className).toBe('govuk-table__caption');
  });
});
