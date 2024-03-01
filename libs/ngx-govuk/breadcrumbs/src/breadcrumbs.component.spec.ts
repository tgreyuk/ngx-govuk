import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxGovukBreadcrumbsItem } from './breadcrumbs-item.directive';
import { NgxGovukBreadcrumbs } from './breadcrumbs.component';

@Component({
  standalone: true,
  imports: [NgxGovukBreadcrumbs, NgxGovukBreadcrumbsItem, RouterModule],
  template: `<ngx-govuk-breadcrumbs>
    <a ngxGovukBreadcrumbsItem href="#">Home</a>
    <a ngxGovukBreadcrumbsItem href="#">Travel abroad</a>
  </ngx-govuk-breadcrumbs>`,
})
class TestHostComponent {}

describe('NgxGovukBreadcrumbs', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: NgxGovukBreadcrumbs;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukBreadcrumbs],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(
      By.directive(NgxGovukBreadcrumbs),
    );
    component = debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default state', () => {
    expect(debugElement.nativeNode).toMatchSnapshot();
  });
});
