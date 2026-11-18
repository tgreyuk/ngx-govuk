import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { NgxGovukUtilsService } from '../../src';
import { NgxGovukAccordionPanel } from './accordion-panel.component';
import { NgxGovukAccordion } from './accordion.component';

@Component({
  imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
  providers: [
    MockProvider(NgxGovukUtilsService, {
      randomId(prefix: string): string {
        return prefix + '-someId';
      },
    }),
  ],
  template: `<ngx-govuk-accordion>
    <ngx-govuk-accordion-panel
      heading="Test heading"
    ></ngx-govuk-accordion-panel>
  </ngx-govuk-accordion>`,
})
class TestHostComponent {}

describe('NgxGovukAccordion', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: NgxGovukAccordion;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NgxGovukAccordion, NgxGovukAccordionPanel],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.directive(NgxGovukAccordion));
    component = debugElement.componentInstance;
  });

  it('should create accordion component', () => {
    expect(component).toBeTruthy();
  });

  it('should render default state', () => {
    expect(debugElement.nativeNode).toMatchSnapshot();
  });

  it('should render expanded state', () => {
    component.toggle();
    fixture.detectChanges();
    expect(debugElement.nativeNode).toMatchSnapshot();
  });
});

@Component({
  imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
  template: `<ngx-govuk-accordion>
    <ngx-govuk-accordion-panel heading="First" [(expanded)]="firstExpanded" />
    <ngx-govuk-accordion-panel heading="Second" [expanded]="secondExpanded()" />
  </ngx-govuk-accordion>`,
})
class BoundHostComponent {
  firstExpanded = signal(false);
  secondExpanded = signal(false);
}

describe('NgxGovukAccordionPanel expanded', () => {
  let fixture: ComponentFixture<BoundHostComponent>;
  let host: BoundHostComponent;

  const sections = (): HTMLElement[] =>
    Array.from(
      fixture.nativeElement.querySelectorAll('ngx-govuk-accordion-panel'),
    );
  const showAllText = (): string =>
    fixture.nativeElement
      .querySelector('.govuk-accordion__show-all-text')
      .textContent.trim();

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('opens a panel from a binding', () => {
    host.secondExpanded.set(true);
    fixture.detectChanges();
    expect(
      sections().map((section) =>
        section.classList.contains('govuk-accordion__section--expanded'),
      ),
    ).toEqual([false, true]);
  });

  it('writes back to a two-way binding when the panel is toggled', () => {
    sections()[0]
      .querySelector<HTMLButtonElement>('.govuk-accordion__section-button')!
      .click();
    fixture.detectChanges();
    expect(host.firstExpanded()).toBe(true);
  });

  it('shows "Hide all sections" once every panel is expanded', () => {
    expect(showAllText()).toBe('Show all sections');
    host.firstExpanded.set(true);
    host.secondExpanded.set(true);
    fixture.detectChanges();
    expect(showAllText()).toBe('Hide all sections');
  });

  it('expands every panel from "Show all sections"', () => {
    host.secondExpanded.set(true);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.govuk-accordion__show-all').click();
    fixture.detectChanges();
    expect(host.firstExpanded()).toBe(true);
    expect(showAllText()).toBe('Hide all sections');
  });

  it('hides closed content until found, so find in page can reach it', () => {
    const first = sections()[0];
    const content = first.querySelector('.govuk-accordion__section-content')!;
    expect(content.getAttribute('hidden')).toBe('until-found');
    content.dispatchEvent(new Event('beforematch'));
    fixture.detectChanges();
    expect(host.firstExpanded()).toBe(true);
    expect(content.hasAttribute('hidden')).toBe(false);
  });
});

@Component({
  imports: [NgxGovukAccordion, NgxGovukAccordionPanel],
  template: `<ngx-govuk-accordion [headingLevel]="3">
    <ngx-govuk-accordion-panel heading="First" summary="A short summary" />
    <ngx-govuk-accordion-panel heading="Second" [(expanded)]="secondExpanded" />
  </ngx-govuk-accordion>`,
})
class OptionsHostComponent {
  secondExpanded = signal(false);
}

describe('NgxGovukAccordion options', () => {
  let fixture: ComponentFixture<OptionsHostComponent>;

  const sections = (): HTMLElement[] =>
    Array.from(
      fixture.nativeElement.querySelectorAll('ngx-govuk-accordion-panel'),
    );
  const button = (section: HTMLElement) =>
    section.querySelector<HTMLButtonElement>(
      '.govuk-accordion__section-button',
    )!;

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsHostComponent);
    fixture.detectChanges();
  });

  it('uses the heading level for every section', () => {
    expect(
      sections().map(
        (section) =>
          section.querySelector('.govuk-accordion__section-heading')!.tagName,
      ),
    ).toEqual(['H3', 'H3']);
  });

  it('includes the summary in the button and its label', () => {
    const [first, second] = sections();
    expect(
      button(first)
        .querySelector('.govuk-accordion__section-summary')!
        .textContent!.trim(),
    ).toBe('A short summary');
    expect(button(first).getAttribute('aria-label')).toBe(
      'First , A short summary , Show this section',
    );
    expect(
      second.querySelector('.govuk-accordion__section-summary'),
    ).toBeNull();
    expect(button(second).getAttribute('aria-label')).toBe(
      'Second , Show this section',
    );
  });
});
