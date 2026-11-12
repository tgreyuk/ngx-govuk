import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxGovukTextInput } from './text-input.directive';

@Component({
  standalone: true,
  imports: [NgxGovukTextInput],
  template: `<input
    type="text"
    ngxGovukTextInput
    formControlName="testControl"
    inputWidth="three-quarters"
  />`,
})
class TestHostComponent {
  form = new FormGroup({
    testContol: new FormControl(),
  });
}

describe('NgxGovukTextInput', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxGovukTextInput, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should accept a FormControl as an input', () => {
    fixture.detectChanges();
    const directive = fixture.debugElement
      .query(By.directive(NgxGovukTextInput))
      .injector.get(NgxGovukTextInput);
    expect(directive.control).toBe(component.form.get('testControl'));
  });

  it('should accept a width as an input and apply it to the host element', () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    expect(
      inputElement.classList.contains('govuk-!-width-three-quarters'),
    ).toBeTruthy();
  });
});
