import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukTag } from './tag.directive';

@Component({
  imports: [NgxGovukTag],
  template: `<strong ngxGovukTag>Completed</strong>
    <strong ngxGovukTag colour="grey">Not started</strong>`,
})
class TestHostComponent {}

describe('NgxGovukTag', () => {
  it('matches the GOV.UK markup snapshot', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
