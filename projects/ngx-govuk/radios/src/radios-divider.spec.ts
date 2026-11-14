import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  NgxGovukRadio,
  NgxGovukRadios,
  NgxGovukRadiosDivider,
} from './radios.component';

@Component({
  imports: [NgxGovukRadios, NgxGovukRadio, NgxGovukRadiosDivider],
  template: `
    <ngx-govuk-radios name="where" legend="Where do you live?">
      <ngx-govuk-radio value="england">England</ngx-govuk-radio>
      <ngx-govuk-radio value="wales">Wales</ngx-govuk-radio>
      <div ngxGovukRadiosDivider>or</div>
      <ngx-govuk-radio value="abroad"
        >I am a British citizen living abroad</ngx-govuk-radio
      >
    </ngx-govuk-radios>
  `,
})
class HostComponent {}

describe('NgxGovukRadiosDivider', () => {
  it('matches the GOV.UK markup snapshot', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.govuk-radios')).toMatchSnapshot();
  });

  it("doesn't count as an option", () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const ids = Array.from(element.querySelectorAll('input')).map(
      (input) => input.id,
    );
    expect(ids).toEqual(['where', 'where-2', 'where-3']);
  });
});
