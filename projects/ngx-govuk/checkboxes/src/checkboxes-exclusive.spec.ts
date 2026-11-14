import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  NgxGovukCheckbox,
  NgxGovukCheckboxConditional,
  NgxGovukCheckboxes,
  NgxGovukCheckboxesDivider,
} from './checkboxes.component';

@Component({
  imports: [
    NgxGovukCheckboxes,
    NgxGovukCheckbox,
    NgxGovukCheckboxesDivider,
    NgxGovukCheckboxConditional,
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form">
      <ngx-govuk-checkboxes
        name="waste"
        legend="Which types of waste do you transport regularly?"
        formGroupName="waste"
      >
        <ngx-govuk-checkbox formControlName="animal">
          Waste from animal carcasses
          <p *ngxGovukCheckboxConditional class="govuk-body">Details</p>
        </ngx-govuk-checkbox>
        <ngx-govuk-checkbox formControlName="mines">
          Waste from mines or quarries
        </ngx-govuk-checkbox>
        <div ngxGovukCheckboxesDivider>or</div>
        <ngx-govuk-checkbox [(checked)]="none" exclusive>
          None of these
        </ngx-govuk-checkbox>
      </ngx-govuk-checkboxes>
    </form>
  `,
})
class HostComponent {
  form = new FormGroup({
    waste: new FormGroup({
      animal: new FormControl(true),
      mines: new FormControl(true),
    }),
  });
  none = signal(false);
}

function setup() {
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const input = (id: string) =>
    element.querySelector(`#${id}`) as HTMLInputElement;
  const click = (id: string) => {
    input(id).click();
    fixture.detectChanges();
  };
  return { fixture, host: fixture.componentInstance, element, input, click };
}

describe('NgxGovukCheckbox exclusive', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(
      setup().element.querySelector('.govuk-checkboxes'),
    ).toMatchSnapshot();
  });

  it('unchecks the others when users check "None"', () => {
    const { host, input, click, element } = setup();
    expect(input('waste-3').getAttribute('data-behaviour')).toBe('exclusive');

    click('waste-3');
    expect(host.none()).toBe(true);
    expect(host.form.value.waste).toEqual({ animal: false, mines: false });
    expect(input('waste').checked).toBe(false);
    expect(input('waste-2').checked).toBe(false);
    expect(
      element
        .querySelector('#conditional-waste')
        ?.classList.contains('govuk-checkboxes__conditional--hidden'),
    ).toBe(true);
  });

  it('unchecks "None" when users check another', () => {
    const { host, input, click } = setup();
    click('waste-3');
    click('waste-2');
    expect(host.none()).toBe(false);
    expect(input('waste-3').checked).toBe(false);
    expect(host.form.value.waste).toEqual({ animal: false, mines: true });
  });

  it('leaves the others alone when users uncheck one', () => {
    const { host, click } = setup();
    click('waste');
    expect(host.form.value.waste).toEqual({ animal: false, mines: true });
    expect(host.none()).toBe(false);
  });
});
