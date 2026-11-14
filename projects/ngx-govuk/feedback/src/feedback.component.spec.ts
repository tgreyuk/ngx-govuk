import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukFeedback } from './feedback.component';

@Component({
  imports: [NgxGovukFeedback],
  template: `<ngx-govuk-feedback
    titleText="Help us improve this service"
    [headingLevel]="headingLevel()"
  >
    <p class="govuk-body">
      Tell us about your experience using this service.
      <a class="govuk-link" href="/feedback">Give us your feedback</a>
    </p>
  </ngx-govuk-feedback>`,
})
class TestHostComponent {
  headingLevel = signal<1 | 2 | 3 | 4 | 5 | 6>(2);
}

function setup() {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  return { fixture, element };
}

describe('NgxGovukFeedback', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().element).toMatchSnapshot();
  });

  it('puts its content in the body', () => {
    const body = setup().element.querySelector('.govuk-feedback__body');
    expect(body?.querySelector('a')?.getAttribute('href')).toBe('/feedback');
  });

  it('can change the heading level', () => {
    const { fixture, element } = setup();
    expect(element.querySelector('h2')?.textContent).toBe(
      'Help us improve this service',
    );
    fixture.componentInstance.headingLevel.set(3);
    fixture.detectChanges();
    expect(element.querySelector('h2')).toBeNull();
    expect(element.querySelector('h3.govuk-feedback__title')).not.toBeNull();
  });
});
