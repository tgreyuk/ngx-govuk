import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukAccordionComponent } from './accordion.component';

jest.mock('nanoid', () => {
  return { nanoid: () => '1234' };
});

describe('AccordionComponent', () => {
  let component: NgxGovukAccordionComponent;
  let fixture: ComponentFixture<NgxGovukAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxGovukAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
