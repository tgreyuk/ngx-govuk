import {
  DestroyRef,
  inject,
  Injectable,
  Injector,
  signal,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

interface Target {
  /** The field's injector, where its `NgControl` is. */
  injector: Injector;
  /** The id an error summary should link to. */
  linkId: () => string | null;
}

/**
 * The fields on the page, so an error summary can link an error to a field
 * by its form control.
 *
 * @internal
 */
@Injectable({ providedIn: 'root' })
export class NgxGovukErrorSummaryTargets {
  private targets = signal<readonly Target[]>([]);

  /** Adds a field. Returns a function that removes it again. */
  add(target: Target): () => void {
    this.targets.update((targets) => [...targets, target]);
    return () =>
      this.targets.update((targets) => targets.filter((t) => t !== target));
  }

  /** The id of the field bound to `control`, if one is on the page. */
  linkId(control: AbstractControl): string | null {
    const target = this.targets().find(
      ({ injector }) =>
        injector.get(NgControl, null, { self: true, optional: true })
          ?.control === control,
    );
    return target?.linkId() ?? null;
  }
}

/**
 * Lets an error summary link to this field by its form control. Call it in
 * the field's constructor.
 *
 * `linkId` returns the id to link to, such as the first radio's.
 *
 * @internal
 */
export function addErrorSummaryTarget(linkId: () => string | null): void {
  // The form control's directive isn't read until an error summary looks for
  // it: radios and other value accessors can't inject it while they're
  // created, as it injects them.
  const injector = inject(Injector);
  const remove = inject(NgxGovukErrorSummaryTargets).add({ injector, linkId });
  inject(DestroyRef).onDestroy(remove);
}
