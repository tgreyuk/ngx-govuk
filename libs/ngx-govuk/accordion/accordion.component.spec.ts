import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukAccordion } from './accordion.component';

describe('NgxGovukAccordion', () => {
  let component: NgxGovukAccordion;
  let fixture: ComponentFixture<NgxGovukAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxGovukAccordion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the state when toggle is called', () => {
    const initialState = component.isExpanded();
    component.toggle();
    expect(component.isExpanded()).toBe(!initialState);
  });
});
