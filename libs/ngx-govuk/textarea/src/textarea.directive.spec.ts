import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxGovukTextarea } from './textarea.directive';

@Component({
  standalone: true,
  imports: [NgxGovukTextarea],
  template: `
    <textarea ngxGovukTextarea formControlName="testControl"></textarea>
  `,
})
class TestHostComponent {
  form = new FormGroup({
    testContol: new FormControl(),
  });
}

describe('NgxGovukTextaresa', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxGovukTextarea, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should accept a FormControl as an input', () => {
    const directive = fixture.debugElement
      .query(By.directive(NgxGovukTextarea))
      .injector.get(NgxGovukTextarea);
    expect(directive.control).toBe(component.form.get('testControl'));
  });
});
