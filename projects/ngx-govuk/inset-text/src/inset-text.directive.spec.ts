import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukInsetText } from './inset-text.directive';

@Component({
  imports: [NgxGovukInsetText],
  template: `<div ngxGovukInsetText>
    It can take up to 8 weeks to register a lasting power of attorney if there
    are no mistakes in the application.
  </div>`,
})
class TestHostComponent {}

describe('NgxGovukInsetText', () => {
  it('matches the GOV.UK markup snapshot', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
