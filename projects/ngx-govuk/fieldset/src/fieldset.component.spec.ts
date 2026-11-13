import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukFieldset } from './fieldset.component';

@Component({
  imports: [NgxGovukFieldset],
  template: `
    <ngx-govuk-fieldset
      legend="What is your address?"
      [legendSize]="legendSize()"
      [asPageHeading]="asPageHeading()"
    >
      <p id="content">Fields</p>
    </ngx-govuk-fieldset>
  `,
})
class HostComponent {
  legendSize = signal<'s' | 'm' | 'l' | 'xl' | undefined>(undefined);
  asPageHeading = signal(false);
}

describe('NgxGovukFieldset', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const legend = () => element.querySelector('legend') as HTMLElement;
    return { fixture, host: fixture.componentInstance, element, legend };
  }

  it('matches the GOV.UK markup snapshot', () => {
    const { fixture, host, element } = setup();
    host.asPageHeading.set(true);
    fixture.detectChanges();
    expect(element.querySelector('ngx-govuk-fieldset')).toMatchSnapshot();
  });

  it('puts its content inside the fieldset, after the legend', () => {
    const { element } = setup();
    expect(
      element.querySelector('fieldset.govuk-fieldset > legend + #content'),
    ).not.toBeNull();
  });

  it('has a body-size legend by default', () => {
    const { legend } = setup();
    expect(legend().className).toBe('govuk-fieldset__legend');
    expect(legend().textContent?.trim()).toBe('What is your address?');
  });

  it('makes the legend a large page heading', () => {
    const { fixture, host, legend } = setup();
    host.asPageHeading.set(true);
    fixture.detectChanges();
    expect(legend().classList).toContain('govuk-fieldset__legend--l');
    expect(legend().querySelector('h1.govuk-fieldset__heading')).not.toBeNull();
  });

  it('sizes the legend', () => {
    const { fixture, host, legend } = setup();
    host.legendSize.set('m');
    fixture.detectChanges();
    expect(legend().classList).toContain('govuk-fieldset__legend--m');
  });
});
