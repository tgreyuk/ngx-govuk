import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';

/** How long users have to press Shift three times, in milliseconds. */
const TIMEOUT = 5000;

/**
 * A button that takes users away from the page quickly, to a page such as
 * the BBC weather forecast, for services where using them could put users
 * at risk.
 *
 * Put it at the top of the page, after the header. Users can also press
 * Shift three times to exit. When they do, the page is hidden behind a
 * loading message while the new page loads, as GOV.UK Frontend does.
 *
 * The button's text is "Emergency Exit this page", with "Emergency" for
 * screen reader users only. Put your own text inside it to change it.
 */
@Component({
  selector: 'ngx-govuk-exit-this-page',
  templateUrl: './exit-this-page.component.html',
  host: { class: 'govuk-exit-this-page' },
})
export class NgxGovukExitThisPage {
  private document = inject(DOCUMENT);

  /** Where the button takes users. */
  redirectUrl = input<string>('https://www.bbc.co.uk/weather');

  /** What screen readers announce while the new page loads. */
  activatedText = input<string>('Loading.');

  /** What screen readers announce if users don't press Shift a third time in time. */
  timedOutText = input<string>('Exit this page expired.');

  /** What screen readers announce after users press Shift once. */
  pressTwoMoreTimesText = input<string>('Shift, press 2 more times to exit.');

  /** What screen readers announce after users press Shift twice. */
  pressOneMoreTimeText = input<string>('Shift, press 1 more time to exit.');

  /** How many times in a row users have pressed Shift. */
  protected presses = signal(0);
  protected status = signal('');

  private lastKeyWasModified = false;
  private pressesTimeout?: ReturnType<typeof setTimeout>;
  private statusTimeout?: ReturnType<typeof setTimeout>;
  private overlay?: HTMLElement;

  constructor() {
    const keyup = (event: KeyboardEvent) => this.onKeyup(event);
    const pageshow = () => this.reset();
    afterNextRender(() => {
      // Capture, so a handler elsewhere that stops the event can't block it.
      this.document.addEventListener('keyup', keyup, true);
      this.document.defaultView?.addEventListener('pageshow', pageshow);
    });
    inject(DestroyRef).onDestroy(() => {
      this.document.removeEventListener('keyup', keyup, true);
      this.document.defaultView?.removeEventListener('pageshow', pageshow);
      this.reset();
    });
  }

  protected exit(event?: Event) {
    event?.preventDefault();
    this.status.set('');
    this.document.body.classList.add('govuk-exit-this-page-hide-content');
    this.overlay?.remove();
    this.overlay = this.document.createElement('div');
    this.overlay.className = 'govuk-exit-this-page-overlay';
    this.overlay.setAttribute('role', 'alert');
    this.document.body.appendChild(this.overlay);
    this.overlay.textContent = this.activatedText();
    this.document.location.href = this.redirectUrl();
  }

  private onKeyup(event: KeyboardEvent) {
    if (event.key === 'Shift' && !this.lastKeyWasModified) {
      this.presses.update((presses) => presses + 1);
      clearTimeout(this.statusTimeout);
      if (this.presses() >= 3) {
        this.presses.set(0);
        clearTimeout(this.pressesTimeout);
        this.exit();
      } else {
        this.status.set(
          this.presses() === 1
            ? this.pressTwoMoreTimesText()
            : this.pressOneMoreTimeText(),
        );
        clearTimeout(this.pressesTimeout);
        this.pressesTimeout = setTimeout(() => this.timeOut(), TIMEOUT);
      }
    } else if (this.presses() > 0) {
      this.timeOut();
    }
    this.lastKeyWasModified = event.shiftKey;
  }

  /** Starts counting Shift presses again, and tells screen reader users. */
  private timeOut() {
    clearTimeout(this.pressesTimeout);
    this.presses.set(0);
    this.status.set(this.timedOutText());
    this.statusTimeout = setTimeout(() => this.status.set(''), TIMEOUT);
  }

  /** Shows the page again, such as when users come back to it. */
  private reset() {
    this.document.body.classList.remove('govuk-exit-this-page-hide-content');
    this.overlay?.remove();
    this.overlay = undefined;
    this.status.set('');
    this.presses.set(0);
    clearTimeout(this.pressesTimeout);
    clearTimeout(this.statusTimeout);
  }
}
