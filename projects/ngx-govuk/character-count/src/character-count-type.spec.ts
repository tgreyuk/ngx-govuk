import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';
import {
  NgxGovukCharacterCount,
  NgxGovukCountType,
} from './character-count.component';

@Component({
  imports: [NgxGovukCharacterCount, NgxGovukTextarea],
  template: `
    <ngx-govuk-character-count
      label="Can you provide more detail?"
      [maxLength]="maxLength()"
      [countType]="countType()"
    >
      <textarea id="detail" ngxGovukTextarea></textarea>
    </ngx-govuk-character-count>
  `,
})
class HostComponent {
  maxLength = signal(5);
  countType = signal<NgxGovukCountType>('words');
}

function setup() {
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const $ = (selector: string) =>
    element.querySelector(selector) as HTMLElement;
  const textarea = $('#detail') as HTMLTextAreaElement;
  const status = () => $('.govuk-character-count__status').textContent?.trim();
  const type = (text: string) => {
    textarea.value = text;
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };
  return { fixture, host: fixture.componentInstance, $, status, type };
}

describe('NgxGovukCharacterCount countType', () => {
  it('counts words', () => {
    const { $, status, type } = setup();
    expect($('#detail-info').textContent?.trim()).toBe(
      'You can enter up to 5 words',
    );
    expect(status()).toBe('You have 5 words remaining');

    // As in GOV.UK Frontend, punctuation and spaces aren't words, and a
    // hyphen splits one.
    type("It's  well-known, isn't it?");
    expect(status()).toBe('You have 0 words remaining');

    type('Four words in here');
    expect(status()).toBe('You have 1 word remaining');

    type('one two three four five six seven');
    expect(status()).toBe('You have 2 words too many');
    expect($('.govuk-character-count__status').classList).toContain(
      'govuk-error-message',
    );
  });

  it('counts characters as users see them', () => {
    const { fixture, host, status, type } = setup();
    host.countType.set('characters');
    fixture.detectChanges();
    type('👍🏽é');
    expect(status()).toBe('You have 3 characters remaining');

    host.countType.set('length');
    fixture.detectChanges();
    expect(status()).toBe('You have 0 characters remaining');
  });
});
