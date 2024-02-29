import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukButton } from './button.directive';

@Component({
  standalone: true,
  imports: [NgxGovukButton],
  template: `<button ngxGovukButton>Default</button>
    <button ngxGovukButton buttonType="warning">Warning</button>
    <button ngxGovukButton buttonType="start">Start</button> `,
})
class TestHostComponent {}

describe('NgxGovukButton', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxGovukButton, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should check markup snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
