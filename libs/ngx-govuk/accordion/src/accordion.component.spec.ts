import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { NgxGovukUtilsService } from '../../src';
import { NgxGovukAccordionPanel } from './accordion-panel.component';
import { NgxGovukAccordion } from './accordion.component';

@Component({
  standalone: true,
  imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
  providers: [
    MockProvider(NgxGovukUtilsService, {
      randomId(prefix: string): string {
        return prefix + '-someId';
      },
    }),
  ],
  template: `<ngx-govuk-accordion>
    <ngx-govuk-accordion-panel
      heading="Test heading"
    ></ngx-govuk-accordion-panel>
  </ngx-govuk-accordion>`,
})
class TestHostComponent {}

describe('NgxGovukAccordion', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: NgxGovukAccordion;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NgxGovukAccordion, NgxGovukAccordionPanel],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.directive(NgxGovukAccordion));
    component = debugElement.componentInstance;
    component.isExpanded.set(false);
  });

  it('should create accordion component', () => {
    expect(component).toBeTruthy();
  });

  it('should render default state', () => {
    expect(debugElement.nativeNode).toMatchSnapshot();
  });

  it('should render expanded state', () => {
    component.toggle();
    fixture.detectChanges();
    expect(debugElement.nativeNode).toMatchSnapshot();
  });
});
