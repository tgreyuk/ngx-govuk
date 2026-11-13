import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxGovukTextarea } from './textarea.directive';

@Component({
  imports: [NgxGovukTextarea, ReactiveFormsModule],
  template: `
    <textarea id="default" ngxGovukTextarea [formControl]="control"></textarea>
    <textarea id="custom" ngxGovukTextarea rows="8"></textarea>
  `,
})
class TestHostComponent {
  control = new FormControl('hello');
}

describe('NgxGovukTextarea', () => {
  function setup() {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const [first, second] = fixture.debugElement.queryAll(
      By.directive(NgxGovukTextarea),
    );
    return { fixture, first, second };
  }

  it('adds the GOV.UK class and works with reactive forms', () => {
    const { first } = setup();
    const textarea = first.nativeElement as HTMLTextAreaElement;
    expect(textarea.classList).toContain('govuk-textarea');
    expect(textarea.value).toBe('hello');
  });

  it("defaults to GOV.UK's 5 rows but keeps rows you set", () => {
    const { first, second } = setup();
    expect(first.nativeElement.getAttribute('rows')).toBe('5');
    expect(second.nativeElement.getAttribute('rows')).toBe('8');
  });

  it('shows govuk-textarea--error when told to by its form group', () => {
    const { fixture, first } = setup();
    first.injector.get(NgxGovukTextarea).hasError.set(true);
    fixture.detectChanges();
    expect(first.nativeElement.classList).toContain('govuk-textarea--error');
  });
});
