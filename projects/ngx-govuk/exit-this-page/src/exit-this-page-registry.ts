import { Injectable, signal } from '@angular/core';

/** What the skip link needs from the exit this page button. */
export interface ExitThisPageButton {
  redirectUrl(): string;
  exit(event?: Event): void;
}

/**
 * Keeps track of the exit this page button on the page, so the skip link,
 * which is usually in another component, can exit the same way.
 */
@Injectable({ providedIn: 'root' })
export class ExitThisPageRegistry {
  readonly button = signal<ExitThisPageButton | undefined>(undefined);

  register(button: ExitThisPageButton) {
    this.button.set(button);
  }

  unregister(button: ExitThisPageButton) {
    if (this.button() === button) {
      this.button.set(undefined);
    }
  }
}
