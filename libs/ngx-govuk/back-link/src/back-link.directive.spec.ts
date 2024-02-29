import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukBackLink } from './back-link.directive';

@Component({
  standalone: true,
  imports: [NgxGovukBackLink],
  template: `<a ngxGovukBackLink>Default</a>
    <a ngxGovukBackLink [inversed]="true">Inversed</a>`,
})
class TestHostComponent {}

describe('NgxGovukBackLink', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxGovukBackLink, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should render markup', () => {
    expect(fixture).toMatchSnapshot();
  });
});
