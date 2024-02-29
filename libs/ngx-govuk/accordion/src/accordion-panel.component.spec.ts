import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukAccordionPanel } from './accordion-panel.component';

describe('NgxGovukAccordionPanel', () => {
  let component: NgxGovukAccordionPanel;
  let fixture: ComponentFixture<NgxGovukAccordionPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukAccordionPanel],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGovukAccordionPanel);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('heading', 'Test heading');
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
