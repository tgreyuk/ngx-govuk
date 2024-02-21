import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukBreadcrumbsComponent } from './breadcrumbs.component';

describe('NgxGovukBreadcrumbsComponent', () => {
  let component: NgxGovukBreadcrumbsComponent;
  let fixture: ComponentFixture<NgxGovukBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukBreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxGovukBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
