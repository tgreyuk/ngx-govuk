import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormField, form } from '@angular/forms/signals';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';
import { NgxGovukCharacterCount } from './character-count.component';

@Component({
  imports: [
    NgxGovukCharacterCount,
    NgxGovukTextarea,
    FormField,
    ReactiveFormsModule,
  ],
  template: `
    <ngx-govuk-character-count id="signal" label="Signal" [maxLength]="10">
      <textarea ngxGovukTextarea [formField]="detailForm"></textarea>
    </ngx-govuk-character-count>

    <ngx-govuk-character-count id="bound" label="Bound" [maxLength]="10">
      <textarea ngxGovukTextarea [value]="draft()"></textarea>
    </ngx-govuk-character-count>

    <ngx-govuk-character-count id="limited" label="Limited" [maxLength]="5">
      <textarea
        ngxGovukTextarea
        maxlength="5"
        [formControl]="control"
        [maxlength]="5"
      ></textarea>
    </ngx-govuk-character-count>
  `,
})
class HostComponent {
  detail = signal('');
  detailForm = form(this.detail);
  draft = signal('');
  control = new FormControl('');
}

function setup() {
  const fixture = TestBed.createComponent(HostComponent);
  // Render again when the count changes after a render, as an app does.
  fixture.autoDetectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const status = (id: string) =>
    element
      .querySelector(`#${id} .govuk-character-count__status`)
      ?.textContent?.trim();
  const textarea = (id: string) =>
    element.querySelector(`#${id} textarea`) as HTMLTextAreaElement;
  return { fixture, host: fixture.componentInstance, status, textarea };
}

describe('NgxGovukCharacterCount value', () => {
  it('counts values set through signal forms', async () => {
    const { fixture, host, status } = setup();
    host.detail.set('12345');
    await fixture.whenStable();
    expect(status('signal')).toBe('You have 5 characters remaining');
  });

  it('counts values set through a binding', async () => {
    const { fixture, host, status } = setup();
    host.draft.set('123');
    await fixture.whenStable();
    expect(status('bound')).toBe('You have 7 characters remaining');
  });

  it('counts a value the browser restores on pageshow', async () => {
    const { fixture, status, textarea } = setup();
    await fixture.whenStable();
    // A restored page isn't rendered again, so only pageshow can tell.
    textarea('bound').value = '12';
    window.dispatchEvent(new Event('pageshow'));
    await fixture.whenStable();
    expect(status('bound')).toBe('You have 8 characters remaining');
  });

  it('removes maxlength so users can type past the limit', async () => {
    const { fixture, host, textarea } = setup();
    await fixture.whenStable();
    expect(textarea('limited').hasAttribute('maxlength')).toBe(false);

    // Angular's maxlength validator binds the attribute, and still validates.
    host.control.setValue('123456');
    await fixture.whenStable();
    expect(textarea('limited').hasAttribute('maxlength')).toBe(false);
    expect(host.control.hasError('maxlength')).toBe(true);
  });
});
