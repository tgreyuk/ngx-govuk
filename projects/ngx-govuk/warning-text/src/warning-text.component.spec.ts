import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukWarningText } from './warning-text.component';

@Component({
  imports: [NgxGovukWarningText],
  template: `<ngx-govuk-warning-text>
      You can be fined up to £5,000 if you do not register.
    </ngx-govuk-warning-text>
    <ngx-govuk-warning-text iconFallbackText="Important">
      Custom fallback text.
    </ngx-govuk-warning-text>`,
})
class TestHostComponent {}

@Component({
  imports: [NgxGovukWarningText],
  template: `<ngx-govuk-warning-text
    >You can be fined.</ngx-govuk-warning-text
  >`,
})
class OneLineHostComponent {}

describe('NgxGovukWarningText', () => {
  it('separates the hidden text from a warning written on one line', () => {
    const fixture = TestBed.createComponent(OneLineHostComponent);
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('strong').textContent;
    expect(text).toBe('Warning You can be fined.');
  });

  it('matches the GOV.UK markup snapshot', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
