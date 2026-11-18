import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxGovukDetails } from './details.component';

@Component({
  imports: [NgxGovukDetails],
  template: `<details
    ngxGovukDetails
    id="help"
    summaryText="Summary text"
    [open]="open()"
  >
    Summary details
  </details>`,
})
class TestHostComponent {
  open = signal(false);
}

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

  it('is the details element, keeping its own attributes', () => {
    const details: HTMLDetailsElement = debugElement.nativeElement;
    expect(details.tagName).toBe('DETAILS');
    expect(details.id).toBe('help');
    expect(details.className).toBe('govuk-details');
    expect(details.querySelector(':scope > summary')).not.toBeNull();
  });

  it('opens with the native open property', () => {
    const details: HTMLDetailsElement = debugElement.nativeElement;
    expect(details.open).toBe(false);
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();
    expect(details.open).toBe(true);
  });
});
