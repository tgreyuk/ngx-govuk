import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukTag, NgxGovukTagColour } from './tag.directive';

@Component({
  imports: [NgxGovukTag],
  template: `<strong ngxGovukTag>Completed</strong>
    <strong ngxGovukTag colour="grey">Not started</strong>`,
})
class TestHostComponent {}

@Component({
  imports: [NgxGovukTag],
  template: `<strong ngxGovukTag class="app-status" [colour]="colour()"
    >Status</strong
  >`,
})
class ColourHostComponent {
  colour = signal<NgxGovukTagColour | undefined>(undefined);
}

describe('NgxGovukTag', () => {
  it('matches the GOV.UK markup snapshot', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('adds the modifier class for each colour', () => {
    const fixture = TestBed.createComponent(ColourHostComponent);
    const tag: HTMLElement = fixture.nativeElement.querySelector('strong');
    const colours: NgxGovukTagColour[] = [
      'grey',
      'green',
      'teal',
      'purple',
      'magenta',
      'red',
      'orange',
      'yellow',
    ];
    for (const colour of colours) {
      fixture.componentInstance.colour.set(colour);
      fixture.detectChanges();
      expect([...tag.classList].sort()).toEqual(
        ['app-status', 'govuk-tag', `govuk-tag--${colour}`].sort(),
      );
    }
  });

  it('keeps only govuk-tag and its own classes when the colour is unset', () => {
    const fixture = TestBed.createComponent(ColourHostComponent);
    fixture.componentInstance.colour.set('red');
    fixture.detectChanges();
    fixture.componentInstance.colour.set(undefined);
    fixture.detectChanges();
    const tag: HTMLElement = fixture.nativeElement.querySelector('strong');
    expect([...tag.classList].sort()).toEqual(['app-status', 'govuk-tag']);
  });
});
