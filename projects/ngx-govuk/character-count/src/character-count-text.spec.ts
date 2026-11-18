import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukPluralText } from 'ngx-govuk';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';
import {
  NgxGovukCharacterCount,
  NgxGovukCountType,
} from './character-count.component';

// Welsh, which has a plural form for two.
const under: NgxGovukPluralText = {
  two: 'Mae gennych %{count} nod ar ôl',
  other: 'Mae gennych %{count} o nodau ar ôl',
};

@Component({
  imports: [NgxGovukCharacterCount, NgxGovukTextarea],
  template: `
    <div lang="cy">
      <ngx-govuk-character-count
        label="Rhowch ragor o fanylion"
        countMessageClasses="app-count"
        textareaDescriptionText="Gallwch roi hyd at %{count} nod"
        [maxLength]="4"
        [countType]="countType()"
        [charactersUnderLimitText]="under"
        charactersAtLimitText="Mae gennych 0 nod ar ôl"
        [charactersOverLimitText]="{ other: '%{count} yn ormod' }"
        [wordsUnderLimitText]="{ other: '%{count} gair ar ôl' }"
        wordsAtLimitText="0 gair ar ôl"
        [wordsOverLimitText]="{ other: '%{count} gair yn ormod' }"
      >
        <textarea id="detail" ngxGovukTextarea></textarea>
      </ngx-govuk-character-count>
    </div>
  `,
})
class HostComponent {
  under = under;
  countType = signal<NgxGovukCountType>('length');
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

describe('NgxGovukCharacterCount text', () => {
  it('uses the description text', () => {
    const { $ } = setup();
    expect($('#detail-info').textContent?.trim()).toBe(
      'Gallwch roi hyd at 4 nod',
    );
  });

  it('uses the character messages, in the plural form for the language', () => {
    const { status, type } = setup();
    expect(status()).toBe('Mae gennych 4 o nodau ar ôl');
    type('12');
    expect(status()).toBe('Mae gennych 2 nod ar ôl');
    type('1234');
    expect(status()).toBe('Mae gennych 0 nod ar ôl');
    type('123456');
    expect(status()).toBe('2 yn ormod');
  });

  it('uses the word messages', () => {
    const { fixture, host, status, type } = setup();
    host.countType.set('words');
    fixture.detectChanges();
    expect(status()).toBe('4 gair ar ôl');
    type('un dau tri pedwar');
    expect(status()).toBe('0 gair ar ôl');
    type('un dau tri pedwar pump');
    expect(status()).toBe('1 gair yn ormod');
  });

  it('adds the count message classes', () => {
    const { $ } = setup();
    expect($('#detail-info').className).toBe(
      'govuk-hint govuk-character-count__message govuk-visually-hidden app-count',
    );
    expect($('.govuk-character-count__status').classList).toContain(
      'app-count',
    );
  });
});
