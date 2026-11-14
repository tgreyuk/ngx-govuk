import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukButton, NgxGovukButtonGroup } from 'ngx-govuk/button';
import { NgxGovukPanel } from './panel.component';

@Component({
  imports: [NgxGovukPanel],
  template: `<ngx-govuk-panel titleText="Application complete">
    Your reference number<br /><strong>HDJ2123F</strong>
  </ngx-govuk-panel>`,
})
class ConfirmationHostComponent {}

@Component({
  imports: [NgxGovukPanel, NgxGovukButton, NgxGovukButtonGroup],
  template: `<ngx-govuk-panel
    titleText="Is your age correct?"
    panelType="interruption"
    [headingLevel]="2"
  >
    <p class="govuk-body">You entered your age as <strong>109</strong>.</p>
    <ngx-govuk-button-group>
      <button ngxGovukButton [inversed]="true">Yes, this is correct</button>
      <a class="govuk-link govuk-link--inverse" href="/age"
        >No, change my age</a
      >
    </ngx-govuk-button-group>
  </ngx-govuk-panel>`,
})
class InterruptionHostComponent {}

describe('NgxGovukPanel', () => {
  it('matches the GOV.UK markup snapshot for a confirmation', () => {
    const fixture = TestBed.createComponent(ConfirmationHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot for an interruption', () => {
    const fixture = TestBed.createComponent(InterruptionHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
