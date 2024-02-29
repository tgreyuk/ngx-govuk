import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxGovukAccordionPanel } from './accordion-panel.component';
import { NgxGovukAccordion } from './accordion.component';

@Component({
  selector: 'ngx-govuk-host-component',
  standalone: true,
  imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
  template: `<ngx-govuk-accordion>
    <ngx-govuk-accordion-panel
      heading="Test heading"
    ></ngx-govuk-accordion-panel>
  </ngx-govuk-accordion>`,
})
class HostComponent {}

describe('NgxGovukAccordion', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: NgxGovukAccordion;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, NgxGovukAccordion, NgxGovukAccordionPanel],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(
      By.directive(NgxGovukAccordion)
    );
    component = debugElement.componentInstance;
  });

  it('should create accordion component', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the panels', () => {
    expect(component.panels().length).toBe(1);
  });

  it('should toggle the state when toggle is called', () => {
    const initialState = component.isExpanded();
    component.toggle();
    expect(component.isExpanded()).toBe(!initialState);
  });
});
