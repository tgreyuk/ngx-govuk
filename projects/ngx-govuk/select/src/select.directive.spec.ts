import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukSelect } from './select.directive';

@Component({
  imports: [NgxGovukFormGroup, NgxGovukSelect],
  template: `<ngx-govuk-form-group
    label="Sort by"
    hint="Choose how to order the results"
    [errorMessage]="errorMessage"
  >
    <select id="sort" name="sort" ngxGovukSelect>
      <option value="published">Recently published</option>
      <option value="updated">Recently updated</option>
      <option value="views">Most views</option>
    </select>
  </ngx-govuk-form-group>`,
})
class TestHostComponent {
  errorMessage: string | null = null;
}

@Component({
  imports: [NgxGovukSelect, ReactiveFormsModule],
  template: `<select
    class="app-own-class"
    ngxGovukSelect
    [formControl]="control"
  >
    <option value="published">Recently published</option>
    <option value="updated">Recently updated</option>
  </select>`,
})
class FormsHostComponent {
  control = new FormControl('updated');
}

function render(errorMessage: string | null = null) {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.componentInstance.errorMessage = errorMessage;
  fixture.detectChanges();
  return fixture;
}

describe('NgxGovukSelect', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(render().nativeElement).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot with an error', () => {
    expect(
      render('Choose how to sort the results').nativeElement,
    ).toMatchSnapshot();
  });

  it('keeps your own classes and works with reactive forms', () => {
    const fixture = TestBed.createComponent(FormsHostComponent);
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector(
      'select',
    ) as HTMLSelectElement;
    expect(select.classList).toContain('app-own-class');
    expect(select.value).toBe('updated');

    select.value = 'published';
    select.dispatchEvent(new Event('change'));
    expect(fixture.componentInstance.control.value).toBe('published');
  });
});
