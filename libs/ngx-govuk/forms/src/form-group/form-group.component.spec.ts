import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukFormGroupComponent } from './ngx-govuk-form-group.component';

describe('NgxGovukFormGroupComponent', () => {
  let component: NgxGovukFormGroupComponent;
  let fixture: ComponentFixture<NgxGovukFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukFormGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxGovukFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
