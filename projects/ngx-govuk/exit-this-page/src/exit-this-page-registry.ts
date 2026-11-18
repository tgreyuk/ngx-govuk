import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';

/** Where GOV.UK Frontend sends users by default. */
export const DEFAULT_REDIRECT_URL = 'https://www.bbc.co.uk/weather';

/** What the registry and skip link need from the exit this page button. */
export interface ExitThisPageButton {
  href(): string;
  exit(event?: Event): void;
  onKeyup(event: KeyboardEvent): void;
}

/**
 * Keeps track of the exit this page buttons on the page, so the skip link,
 * which is usually in another component, can exit the same way, and so
 * Shift presses are counted once for the whole page, as GOV.UK Frontend
 * does, even if there is more than one button.
 */
@Injectable({ providedIn: 'root' })
export class ExitThisPageRegistry implements OnDestroy {
  private document = inject(DOCUMENT);
  private buttons = signal<readonly ExitThisPageButton[]>([]);
  private listening = false;
  private keyup = (event: KeyboardEvent) => this.button()?.onKeyup(event);

  /** The button the skip link and Shift presses use: the latest one. */
  readonly button = computed(() => this.buttons().at(-1));

  register(button: ExitThisPageButton) {
    this.buttons.update((buttons) => [...buttons, button]);
  }

  unregister(button: ExitThisPageButton) {
    this.buttons.update((buttons) => buttons.filter((b) => b !== button));
    if (this.buttons().length === 0) {
      this.stopListening();
    }
  }

  /** Starts counting Shift presses. Call it in the browser only. */
  listen() {
    if (this.listening) return;
    // Capture, so a handler elsewhere that stops the event can't block it.
    this.document.addEventListener('keyup', this.keyup, true);
    this.listening = true;
  }

  ngOnDestroy() {
    this.stopListening();
  }

  private stopListening() {
    if (!this.listening) return;
    this.document.removeEventListener('keyup', this.keyup, true);
    this.listening = false;
  }
}
