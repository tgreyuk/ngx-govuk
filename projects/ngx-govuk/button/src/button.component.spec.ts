import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGovukButton } from './button.component';

@Component({
  imports: [NgxGovukButton],
  template: `<button ngxGovukButton>Default</button>
    <button ngxGovukButton inverse>Inverse</button>
    <button ngxGovukButton buttonType="warning">Warning</button>
    <button ngxGovukButton buttonType="start">Start</button>
    <button ngxGovukButton disabled>Disabled</button>
    <a ngxGovukButton href="/">Link</a>`,
})
class TestHostComponent {}

describe('NgxGovukButton', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render markup', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});

@Component({
  imports: [NgxGovukButton],
  template: `<button ngxGovukButton [buttonType]="buttonType()">
    @if (showIcon()) {
      <svg class="own-icon"></svg>
    }
    Print
  </button>`,
})
class StartHostComponent {
  buttonType = signal<'secondary' | 'start' | undefined>(undefined);
  showIcon = signal(true);
}

describe('NgxGovukButton start icon', () => {
  let fixture: ComponentFixture<StartHostComponent>;
  const icons = (selector: string) =>
    fixture.nativeElement.querySelectorAll(selector).length;

  beforeEach(() => {
    fixture = TestBed.createComponent(StartHostComponent);
    fixture.detectChanges();
  });

  it('adds and removes the icon as buttonType changes', () => {
    expect(icons('.govuk-button__start-icon')).toBe(0);

    fixture.componentInstance.buttonType.set('start');
    fixture.detectChanges();
    expect(icons('.govuk-button__start-icon')).toBe(1);

    fixture.componentInstance.buttonType.set('secondary');
    fixture.detectChanges();
    expect(icons('.govuk-button__start-icon')).toBe(0);
  });

  it('leaves an svg inside the button alone', () => {
    expect(icons('.own-icon')).toBe(1);

    fixture.componentInstance.buttonType.set('start');
    fixture.detectChanges();
    fixture.componentInstance.buttonType.set(undefined);
    fixture.detectChanges();
    expect(icons('.own-icon')).toBe(1);

    fixture.componentInstance.showIcon.set(false);
    fixture.detectChanges();
    expect(icons('.own-icon')).toBe(0);
  });
});

@Component({
  imports: [NgxGovukButton],
  template: `<button ngxGovukButton [disabled]="disabled()">Button</button>
    <a
      ngxGovukButton
      href="/"
      [disabled]="disabled()"
      (click)="clicks = clicks + 1"
      >Link</a
    >`,
})
class ElementHostComponent {
  disabled = signal(false);
  clicks = 0;
}

describe('NgxGovukButton button and link', () => {
  let fixture: ComponentFixture<ElementHostComponent>;
  let button: HTMLButtonElement;
  let link: HTMLAnchorElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementHostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
    link = fixture.nativeElement.querySelector('a');
    link.addEventListener('click', (event) => event.preventDefault());
  });

  it('gives a link a button role and stops it being dragged', () => {
    expect(link.getAttribute('role')).toBe('button');
    expect(link.getAttribute('draggable')).toBe('false');
    expect(button.hasAttribute('role')).toBe(false);
    expect(button.hasAttribute('draggable')).toBe(false);
  });

  it('selects a link with the Space key', () => {
    const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.clicks).toBe(1);
  });

  it('leaves the Space key on a button to the browser', () => {
    const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
    button.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('sets disabled and aria-disabled on a disabled button', () => {
    expect(button.hasAttribute('disabled')).toBe(false);
    expect(button.hasAttribute('aria-disabled')).toBe(false);

    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(link.hasAttribute('disabled')).toBe(false);
    expect(link.hasAttribute('aria-disabled')).toBe(false);
  });
});

@Component({
  imports: [NgxGovukButton],
  template: `<button ngxGovukButton [preventDoubleClick]="prevent()">
    Save
  </button>`,
})
class DoubleClickHostComponent {
  prevent = signal(true);
}

describe('NgxGovukButton preventDoubleClick', () => {
  let fixture: ComponentFixture<DoubleClickHostComponent>;
  let button: HTMLButtonElement;
  const click = () => {
    const event = new MouseEvent('click', { cancelable: true });
    button.dispatchEvent(event);
    return event.defaultPrevented;
  };

  beforeEach(() => {
    vi.useFakeTimers();
    fixture = TestBed.createComponent(DoubleClickHostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ignores a second click within 1 second', () => {
    expect(click()).toBe(false);
    expect(click()).toBe(true);

    vi.advanceTimersByTime(1000);
    expect(click()).toBe(false);
  });

  it('lets every click through when it is not set', () => {
    fixture.componentInstance.prevent.set(false);
    fixture.detectChanges();
    expect(click()).toBe(false);
    expect(click()).toBe(false);
  });
});
