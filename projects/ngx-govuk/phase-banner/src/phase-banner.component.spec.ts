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

describe('NgxGovukPhaseBanner', () => {
  it('matches the GOV.UK markup snapshot', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
