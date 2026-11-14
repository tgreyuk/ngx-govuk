import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  NgxGovukCheckbox,
  NgxGovukCheckboxConditional,
  NgxGovukCheckboxes,
} from './checkboxes.component';

@Component({
  imports: [NgxGovukCheckboxes, NgxGovukCheckbox, NgxGovukCheckboxConditional],
  template: `
    <ngx-govuk-checkboxes
      name="contact"
      legend="How would you like to be contacted?"
    >
      <ngx-govuk-checkbox [(checked)]="email">
        Email
        <p *ngxGovukCheckboxConditional class="govuk-body">We'll email you.</p>
      </ngx-govuk-checkbox>
      <ngx-govuk-checkbox>Phone</ngx-govuk-checkbox>
    </ngx-govuk-checkboxes>
  `,
})
class HostComponent {
  email = signal(false);
}

function setup() {
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const $ = (selector: string) =>
    element.querySelector(selector) as HTMLElement;
  return { fixture, host: fixture.componentInstance, element, $ };
}

describe('NgxGovukCheckboxConditional', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(setup().element).toMatchSnapshot();
  });

  it('shows the content only while its checkbox is checked', () => {
    const { fixture, host, $ } = setup();
    const conditional = $('#conditional-contact');
    expect(conditional.previousElementSibling?.querySelector('input')?.id).toBe(
      'contact',
    );
    expect(conditional.classList).toContain(
      'govuk-checkboxes__conditional--hidden',
    );
    expect($('#contact').getAttribute('aria-controls')).toBe(
      'conditional-contact',
    );
    expect($('#contact').getAttribute('aria-expanded')).toBe('false');

    $('#contact').click();
    fixture.detectChanges();
    expect(host.email()).toBe(true);
    expect(conditional.classList).not.toContain(
      'govuk-checkboxes__conditional--hidden',
    );
    expect($('#contact').getAttribute('aria-expanded')).toBe('true');
    expect($('#contact-2').hasAttribute('aria-controls')).toBe(false);
  });
});
