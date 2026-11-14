import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxGovukUtilsService } from 'ngx-govuk';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';
import { MockProvider } from 'ng-mocks';
import { NgxGovukCharacterCount } from './character-count.component';

@Component({
  imports: [NgxGovukCharacterCount, NgxGovukTextarea, ReactiveFormsModule],
  template: `
    <ngx-govuk-character-count
      id="detail-count"
      label="Can you provide more detail?"
      [hint]="hint()"
      [errorMessage]="errorMessage()"
      [asPageHeading]="asPageHeading()"
      [maxLength]="10"
      [threshold]="threshold()"
    >
      <textarea
        id="detail"
        ngxGovukTextarea
        aria-describedby="own-help"
        [formControl]="control"
      ></textarea>
    </ngx-govuk-character-count>

    <ngx-govuk-character-count id="no-id" label="No id" [maxLength]="5">
      <textarea ngxGovukTextarea></textarea>
    </ngx-govuk-character-count>
  `,
})
class HostComponent {
  control = new FormControl('');
  hint = signal<string | undefined>('Do not include personal information.');
  errorMessage = signal<string | null>(null);
  asPageHeading = signal(false);
  threshold = signal<number | undefined>(undefined);
}

describe('NgxGovukCharacterCount', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(NgxGovukUtilsService, {
          randomId: (prefix: string) => `${prefix}-generated`,
        }),
      ],
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const $ = (selector: string) =>
      element.querySelector(selector) as HTMLElement;
    const textarea = $('#detail') as HTMLTextAreaElement;
    const status = () => $('#detail-count .govuk-character-count__status');
    const srStatus = () => $('#detail-count .govuk-character-count__sr-status');
    const type = (text: string) => {
      textarea.value = text;
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    };
    return {
      fixture,
      host: fixture.componentInstance,
      $,
      textarea,
      status,
      srStatus,
      type,
    };
  }

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches the GOV.UK markup snapshot', () => {
    const { fixture, host, $ } = setup();
    host.errorMessage.set('Enter more detail');
    host.asPageHeading.set(true);
    fixture.detectChanges();
    expect($('#detail-count')).toMatchSnapshot();
  });

  it('connects the label, hint, error and count to the textarea', () => {
    const { fixture, host, $, textarea } = setup();
    expect($('#detail-count label').getAttribute('for')).toBe('detail');
    expect($('#detail-info').textContent?.trim()).toBe(
      'You can enter up to 10 characters',
    );
    expect(textarea.getAttribute('aria-describedby')).toBe(
      'own-help detail-info detail-hint',
    );

    host.errorMessage.set('Enter more detail');
    fixture.detectChanges();
    expect(textarea.getAttribute('aria-describedby')).toBe(
      'own-help detail-info detail-hint detail-error',
    );
    expect(textarea.classList).toContain('govuk-textarea--error');
    expect($('#detail-count > .govuk-form-group').classList).toContain(
      'govuk-form-group--error',
    );
  });

  it('generates an id when the textarea has none', () => {
    const { $ } = setup();
    expect($('#no-id textarea').id).toBe('field-generated');
    expect($('#no-id textarea').getAttribute('aria-describedby')).toBe(
      'field-generated-info',
    );
  });

  it('counts down as users type', () => {
    const { status, type } = setup();
    expect(status().textContent?.trim()).toBe(
      'You have 10 characters remaining',
    );
    type('123456789');
    expect(status().textContent?.trim()).toBe('You have 1 character remaining');
    expect(status().classList).toContain('govuk-hint');
  });

  it('lets users go over the limit and shows the error styles', () => {
    const { status, textarea, type } = setup();
    type('12345678901');
    expect(textarea.value).toBe('12345678901');
    expect(textarea.hasAttribute('maxlength')).toBe(false);
    expect(status().textContent?.trim()).toBe('You have 1 character too many');
    expect(status().classList).toContain('govuk-error-message');
    expect(status().classList).not.toContain('govuk-hint');
    expect(textarea.classList).toContain('govuk-textarea--error');

    type('123');
    expect(textarea.classList).not.toContain('govuk-textarea--error');
  });

  it('counts values set through the form control', () => {
    const { fixture, host, status } = setup();
    host.control.setValue('12345');
    fixture.detectChanges();
    expect(status().textContent?.trim()).toBe(
      'You have 5 characters remaining',
    );
  });

  it('tells screen readers the count once users stop typing', () => {
    vi.useFakeTimers();
    const { fixture, srStatus, type } = setup();
    type('12');
    expect(srStatus().textContent?.trim()).toBe(
      'You have 10 characters remaining',
    );
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    expect(srStatus().textContent?.trim()).toBe(
      'You have 8 characters remaining',
    );
    expect(srStatus().getAttribute('aria-live')).toBe('polite');
  });

  it('hides the count until the threshold', () => {
    const { fixture, host, status, srStatus, type } = setup();
    host.threshold.set(50);
    fixture.detectChanges();
    expect(status().classList).toContain(
      'govuk-character-count__message--disabled',
    );
    expect(srStatus().getAttribute('aria-hidden')).toBe('true');

    type('12345');
    expect(status().classList).not.toContain(
      'govuk-character-count__message--disabled',
    );
    expect(srStatus().hasAttribute('aria-hidden')).toBe(false);
  });
});
