import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukFileUpload } from './file-upload.directive';

@Component({
  imports: [NgxGovukFormGroup, NgxGovukFileUpload],
  template: `<ngx-govuk-form-group
    label="Upload a file"
    hint="Your photo may be in your Pictures, Photos, Downloads or Desktop folder"
    [errorMessage]="errorMessage"
  >
    <input id="file-upload" name="fileUpload" type="file" ngxGovukFileUpload />
  </ngx-govuk-form-group>`,
})
class TestHostComponent {
  errorMessage: string | null = null;
}

function render(errorMessage: string | null = null) {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.componentInstance.errorMessage = errorMessage;
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('NgxGovukFileUpload', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(render()).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot with an error', () => {
    expect(render('The selected file must be a JPG or PNG')).toMatchSnapshot();
  });
});
