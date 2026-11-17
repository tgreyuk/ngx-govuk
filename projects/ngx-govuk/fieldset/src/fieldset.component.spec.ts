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
      [describedBy]="describedBy()"
      [role]="role()"
    >
      <p id="content">Fields</p>
    </ngx-govuk-fieldset>
  `,
})
class HostComponent {
  legendSize = signal<'s' | 'm' | 'l' | 'xl' | undefined>(undefined);
  asPageHeading = signal(false);
  describedBy = signal<string | undefined>(undefined);
  role = signal<string | undefined>(undefined);
}

describe('NgxGovukFieldset', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const legend = () => element.querySelector('legend') as HTMLElement;
    const fieldset = () => element.querySelector('fieldset') as HTMLElement;
    return {
      fixture,
      host: fixture.componentInstance,
      element,
      legend,
      fieldset,
    };
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
    expect(legend().textContent).toBe('What is your address?');
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

  it('links the fieldset to the elements that describe it', () => {
    const { fixture, host, fieldset } = setup();
    expect(fieldset().hasAttribute('aria-describedby')).toBe(false);
    host.describedBy.set('address-hint');
    fixture.detectChanges();
    expect(fieldset().getAttribute('aria-describedby')).toBe('address-hint');
  });

  it('sets the role on the fieldset', () => {
    const { fixture, host, fieldset } = setup();
    expect(fieldset().hasAttribute('role')).toBe(false);
    host.role.set('group');
    fixture.detectChanges();
    expect(fieldset().getAttribute('role')).toBe('group');
  });

  it('displays as a block', () => {
    const { element } = setup();
    const host = element.querySelector('ngx-govuk-fieldset') as HTMLElement;
    expect(getComputedStyle(host).display).toBe('block');
  });
});
