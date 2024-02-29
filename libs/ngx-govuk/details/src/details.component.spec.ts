import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxGovukDetails } from './details.component';

@Component({
  standalone: true,
  imports: [NgxGovukDetails],
  template: `<ngx-govuk-details summaryText="Summary text">
    Summary details
  </ngx-govuk-details>`,
})
class TestHostComponent {}

describe('NgxGovukDetailsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: NgxGovukDetails;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukDetails],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.directive(NgxGovukDetails));
    component = debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default state', () => {
    expect(debugElement.nativeNode).toMatchSnapshot();
  });
});
