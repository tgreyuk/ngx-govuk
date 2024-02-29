import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukDetails } from './details.component';

describe('NgxGovukDetailsComponent', () => {
  let component: NgxGovukDetails;
  let fixture: ComponentFixture<NgxGovukDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukDetails],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGovukDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('summaryText', 'Test Summary Text');
    fixture.componentRef.setInput('text', 'Test Text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct summaryText', () => {
    expect(component.summaryText()).toBe('Test Summary Text');
  });

  it('should have correct text', () => {
    expect(component.text()).toBe('Test Text');
  });
});
