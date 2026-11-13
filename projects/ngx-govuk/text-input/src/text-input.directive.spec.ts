import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxGovukTextInput } from './text-input.directive';

@Component({
  imports: [NgxGovukTextInput, ReactiveFormsModule],
  template: `<input
    type="text"
    class="app-own-class"
    autocomplete="email"
    ngxGovukTextInput
    [formControl]="control"
    inputWidth="three-quarters"
  />`,
})
class TestHostComponent {
  control = new FormControl('hello');
}

function setup() {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const debugElement = fixture.debugElement.query(
    By.directive(NgxGovukTextInput),
  );
  return {
    fixture,
    input: debugElement.nativeElement as HTMLInputElement,
    directive: debugElement.injector.get(NgxGovukTextInput),
  };
}

describe('NgxGovukTextInput', () => {
  it('adds GOV.UK classes and keeps your own classes and attributes', () => {
    const { input } = setup();
    expect([...input.classList]).toEqual(
      expect.arrayContaining([
        'govuk-input',
        'govuk-!-width-three-quarters',
        'app-own-class',
      ]),
    );
    expect(input.getAttribute('autocomplete')).toBe('email');
  });

  it('works with reactive forms', () => {
    const { input } = setup();
    expect(input.value).toBe('hello');
  });

  it('shows the error class only when told to by its form group', () => {
    const { fixture, input, directive } = setup();
    expect(input.classList).not.toContain('govuk-input--error');
    directive.hasError.set(true);
    fixture.detectChanges();
    expect(input.classList).toContain('govuk-input--error');
  });
});
