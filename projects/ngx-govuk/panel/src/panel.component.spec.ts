import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukButton, NgxGovukButtonGroup } from 'ngx-govuk/button';
import { NgxGovukPanel } from './panel.component';

@Component({
  imports: [NgxGovukPanel],
  template: `<ngx-govuk-panel titleText="Application complete">
    Your reference number<br /><strong>HDJ2123F</strong>
  </ngx-govuk-panel>`,
})
class ConfirmationHostComponent {}

@Component({
  imports: [NgxGovukPanel, NgxGovukButton, NgxGovukButtonGroup],
  template: `<ngx-govuk-panel
    titleText="Is your age correct?"
    panelType="interruption"
    [headingLevel]="2"
  >
    <p class="govuk-body">You entered your age as <strong>109</strong>.</p>
    <ngx-govuk-button-group>
      <button ngxGovukButton inverse>Yes, this is correct</button>
      <a class="govuk-link govuk-link--inverse" href="/age"
        >No, change my age</a
      >
    </ngx-govuk-button-group>
  </ngx-govuk-panel>`,
})
class InterruptionHostComponent {}

@Component({
  imports: [NgxGovukPanel],
  template: `<ngx-govuk-panel
    id="done"
    class="govuk-!-margin-bottom-0"
    titleText="Application complete"
  />`,
})
class ClassesHostComponent {}

@Component({
  imports: [NgxGovukPanel],
  template: `<ngx-govuk-panel titleText="Application complete" />`,
})
class TitleOnlyHostComponent {}

@Component({
  imports: [NgxGovukPanel, NgxGovukButton, NgxGovukButtonGroup],
  template: `<ngx-govuk-panel
    titleText="Is your age correct?"
    [panelType]="type"
  >
    <div>
      <ngx-govuk-button-group>
        <button ngxGovukButton inverse>Yes, this is correct</button>
      </ngx-govuk-button-group>
    </div>
  </ngx-govuk-panel>`,
})
class NestedActionsHostComponent {
  type: 'confirmation' | 'interruption' = 'interruption';
}

@Component({
  imports: [NgxGovukPanel, NgxGovukButton, NgxGovukButtonGroup],
  template: `<ngx-govuk-panel titleText="Application complete">
    <ngx-govuk-button-group>
      <button ngxGovukButton inverse>Continue</button>
    </ngx-govuk-button-group>
  </ngx-govuk-panel>`,
})
class ConfirmationActionsHostComponent {}

function render<T>(host: new () => T) {
  const fixture = TestBed.createComponent(host);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('NgxGovukPanel', () => {
  it('matches the GOV.UK markup snapshot for a confirmation', () => {
    const fixture = TestBed.createComponent(ConfirmationHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('matches the GOV.UK markup snapshot for an interruption', () => {
    const fixture = TestBed.createComponent(InterruptionHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('is the GOV.UK panel itself, keeping the classes set on it', () => {
    const fixture = TestBed.createComponent(ClassesHostComponent);
    fixture.detectChanges();
    const panel: HTMLElement = fixture.nativeElement.querySelector('#done');
    expect(panel.tagName).toBe('NGX-GOVUK-PANEL');
    expect(Array.from(panel.classList).sort()).toEqual([
      'govuk-!-margin-bottom-0',
      'govuk-panel',
      'govuk-panel--confirmation',
    ]);
    expect(fixture.nativeElement.querySelectorAll('.govuk-panel').length).toBe(
      1,
    );
  });

  it('has no space under the title when there is no body', () => {
    // GOV.UK's margin, which it removes when the title is the last child.
    const style = document.createElement('style');
    style.textContent = '.govuk-panel__title { margin-bottom: 30px; }';
    document.head.appendChild(style);
    const element = render(TitleOnlyHostComponent);
    const title = element.querySelector('.govuk-panel__title') as HTMLElement;
    const body = element.querySelector('.govuk-panel__body') as HTMLElement;
    expect(getComputedStyle(body).display).toBe('none');
    expect(getComputedStyle(title).marginBottom).toBe('0px');
    style.remove();
  });

  it('shows the body when it has content', () => {
    const style = document.createElement('style');
    style.textContent = '.govuk-panel__title { margin-bottom: 30px; }';
    document.head.appendChild(style);
    const element = render(ConfirmationHostComponent);
    const title = element.querySelector('.govuk-panel__title') as HTMLElement;
    const body = element.querySelector('.govuk-panel__body') as HTMLElement;
    expect(getComputedStyle(body).display).not.toBe('none');
    expect(getComputedStyle(title).marginBottom).toBe('30px');
    style.remove();
  });

  it('leaves a button group inside other content in the body', () => {
    const element = render(NestedActionsHostComponent);
    expect(element.querySelector('.govuk-panel__actions')).toBeNull();
    expect(
      element.querySelector('.govuk-panel__body ngx-govuk-button-group'),
    ).not.toBeNull();
  });

  it('has actions only when it is an interruption panel', () => {
    const element = render(ConfirmationActionsHostComponent);
    expect(element.querySelector('.govuk-panel__actions')).toBeNull();
  });
});
