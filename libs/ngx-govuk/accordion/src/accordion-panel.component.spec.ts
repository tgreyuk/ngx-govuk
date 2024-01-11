import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukAccordionPanelComponent } from './accordion-panel.component';

jest.mock('nanoid', () => {
  return { nanoid: () => '1234' };
});

describe('AccordionPanelComponent', () => {
  let component: NgxGovukAccordionPanelComponent;
  let fixture: ComponentFixture<NgxGovukAccordionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukAccordionPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxGovukAccordionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
