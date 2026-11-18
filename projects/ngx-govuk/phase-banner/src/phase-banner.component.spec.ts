import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukPhaseBanner } from './phase-banner.component';

@Component({
  imports: [NgxGovukPhaseBanner],
  template: `<ngx-govuk-phase-banner tagText="Alpha">
    This is a new service. Help us improve it and
    <a class="govuk-link" href="/feedback">give your feedback</a>.
  </ngx-govuk-phase-banner>`,
})
class TestHostComponent {}

@Component({
  imports: [NgxGovukPhaseBanner],
  template: `<ngx-govuk-phase-banner tagText="Beta" tagColour="grey">
    This is a new service.
  </ngx-govuk-phase-banner>`,
})
class ColourHostComponent {}

describe('NgxGovukPhaseBanner', () => {
  it('matches the GOV.UK markup snapshot', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('sets the tag colour, keeping the banner class', () => {
    const fixture = TestBed.createComponent(ColourHostComponent);
    fixture.detectChanges();
    const tag = (fixture.nativeElement as HTMLElement).querySelector(
      'strong',
    ) as HTMLElement;
    expect(Array.from(tag.classList).sort()).toEqual([
      'govuk-phase-banner__content__tag',
      'govuk-tag',
      'govuk-tag--grey',
    ]);
  });
});
