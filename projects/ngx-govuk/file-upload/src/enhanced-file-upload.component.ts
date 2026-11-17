import { DOCUMENT } from '@angular/common';
import {
  afterEveryRender,
  afterNextRender,
  Component,
  computed,
  contentChild,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { NgxGovukPluralText, formatPluralText } from 'ngx-govuk';

// Kept here too, where it was first exported.
export type { NgxGovukPluralText } from 'ngx-govuk';

/**
 * Improves a file upload with a button that shows which file users chose,
 * and a drop zone they can drag files onto, as GOV.UK Frontend's JavaScript
 * does.
 *
 * Put it around an `input type="file"` with `ngxGovukFileUpload`, inside
 * `ngx-govuk-form-group`. The input is hidden, and the button takes its `id`
 * so the label still points to it. The input gets the `id` with `-input` on
 * the end. Files dropped on the button fill the input, which fires its
 * `input` and `change` events, as choosing them does.
 *
 * The component's element is GOV.UK's wrapper, so classes and attributes on
 * it go on the wrapper, as GOV.UK's `wrapperClasses` and `wrapperAttributes`
 * do. Classes and attributes on the input stay on the input.
 */
@Component({
  selector: 'ngx-govuk-enhanced-file-upload',
  templateUrl: './enhanced-file-upload.component.html',
  host: {
    class: 'govuk-file-upload-wrapper',
    '[class.govuk-file-upload-wrapper--disabled]': 'disabled()',
  },
  // GOV.UK's wrapper class sets display, which would beat the browser's
  // own style for the hidden attribute.
  styles: ':host([hidden]) { display: none; }',
})
export class NgxGovukEnhancedFileUpload {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private document = inject(DOCUMENT);
  private control = contentChild(NgControl, { descendants: true });

  /** The text of the button that opens the file picker. */
  chooseFilesButtonText = input<string>('Choose file');

  /** The text that tells users they can drop files on the button. */
  dropInstructionText = input<string>('or drop file');

  /** The text shown before users choose a file. */
  noFileChosenText = input<string>('No file chosen');

  /**
   * The text shown when users choose more than one file, for each plural
   * form. `%{count}` is replaced with the number of files.
   */
  multipleFilesChosenText = input<NgxGovukPluralText>({
    one: '%{count} file chosen',
    other: '%{count} files chosen',
  });

  /** What screen readers announce when users drag files onto the button. */
  enteredDropZoneText = input<string>('Entered drop zone');

  /** What screen readers announce when users drag files away again. */
  leftDropZoneText = input<string>('Left drop zone');

  protected fileInput?: HTMLInputElement;

  protected buttonId = signal('');
  protected commaId = computed(() => `${this.buttonId()}-comma`);
  private labelId = signal('');
  protected labelledBy = computed(() =>
    this.buttonId()
      ? `${this.labelId()} ${this.commaId()} ${this.buttonId()}`.trim()
      : null,
  );
  protected describedBy = signal('');
  protected disabled = signal(false);
  protected dragging = signal(false);
  protected announcement = signal('');

  protected fileCount = signal(0);
  private fileName = signal('');
  protected status = computed(() => {
    const count = this.fileCount();
    if (count === 0) {
      return this.noFileChosenText();
    }
    if (count === 1) {
      return this.fileName();
    }
    return formatPluralText(
      this.multipleFilesChosenText(),
      count,
      this.pluralRules,
    );
  });

  private pluralRules = new Intl.PluralRules('en');
  private enteredAnotherElement = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const input =
        this.host.nativeElement.querySelector<HTMLInputElement>(
          'input[type="file"]',
        );
      if (!input) {
        return;
      }
      this.fileInput = input;
      this.pluralRules = new Intl.PluralRules(this.lang());

      // As GOV.UK Frontend does: the button takes the input's id, so the
      // label points to it, and is labelled by the label.
      const id = input.id;
      const label = id
        ? Array.from(this.document.querySelectorAll('label')).find(
            (label) => label.htmlFor === id,
          )
        : undefined;
      if (label && !label.id) {
        label.id = `${id}-label`;
      }
      this.labelId.set(label?.id ?? '');
      input.id = `${id}-input`;
      this.buttonId.set(id);
      this.syncWithInput();

      const onChange = () => this.updateFiles();
      input.addEventListener('change', onChange);
      // A form control can clear the input without a change event.
      this.control()
        ?.valueChanges?.pipe(takeUntilDestroyed(destroyRef))
        .subscribe(onChange);
      // So can resetting the form. The reset event comes before the reset.
      let resetTimer: ReturnType<typeof setTimeout> | undefined;
      const form = input.form;
      const onReset = () => {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(onChange);
      };
      form?.addEventListener('reset', onReset);
      const observer = new MutationObserver(() => this.syncWithInput());
      observer.observe(input, {
        attributes: true,
        attributeFilter: ['disabled', 'aria-describedby'],
      });

      const onDragEnter = (event: DragEvent) => {
        this.updateDropZone(event);
        this.enteredAnotherElement = true;
      };
      const onDragLeave = () => {
        if (!this.enteredAnotherElement && !this.disabled()) {
          this.leaveDropZone();
        }
        this.enteredAnotherElement = false;
      };
      this.document.addEventListener('dragenter', onDragEnter);
      this.document.addEventListener('dragleave', onDragLeave);

      destroyRef.onDestroy(() => {
        input.removeEventListener('change', onChange);
        form?.removeEventListener('reset', onReset);
        clearTimeout(resetTimer);
        observer.disconnect();
        this.document.removeEventListener('dragenter', onDragEnter);
        this.document.removeEventListener('dragleave', onDragLeave);
      });
    });
    // Bindings and signal forms can clear the input without an event too, so
    // check it after each render.
    afterEveryRender(() => this.updateFiles());
  }

  protected onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (this.fileInput && files && this.fitsInput(files.length)) {
      this.fileInput.files = files;
      this.fileInput.dispatchEvent(new Event('input', { bubbles: true }));
      this.fileInput.dispatchEvent(new Event('change', { bubbles: true }));
      this.dragging.set(false);
    }
  }

  private updateFiles() {
    const files = this.fileInput?.files;
    this.fileCount.set(files?.length ?? 0);
    this.fileName.set(files?.[0]?.name ?? '');
  }

  private syncWithInput() {
    this.disabled.set(!!this.fileInput?.disabled);
    this.describedBy.set(
      this.fileInput?.getAttribute('aria-describedby') ?? '',
    );
  }

  private updateDropZone(event: DragEvent) {
    if (this.disabled() || !(event.target instanceof Node)) {
      return;
    }
    if (this.host.nativeElement.contains(event.target)) {
      if (
        event.dataTransfer &&
        this.canDrop(event.dataTransfer) &&
        !this.dragging()
      ) {
        this.dragging.set(true);
        this.announcement.set(this.enteredDropZoneText());
      }
    } else if (this.dragging()) {
      this.leaveDropZone();
    }
  }

  private leaveDropZone() {
    this.dragging.set(false);
    this.announcement.set(this.leftDropZoneText());
  }

  private canDrop(dataTransfer: DataTransfer) {
    if (dataTransfer.items?.length) {
      const files = Array.from(dataTransfer.items).filter(
        (item) => item.kind === 'file',
      );
      return this.fitsInput(files.length);
    }
    if (dataTransfer.types?.length) {
      return dataTransfer.types.includes('Files');
    }
    return true;
  }

  /** Whether the input takes this many files. */
  private fitsInput(count: number) {
    return this.fileInput?.multiple ? count > 0 : count === 1;
  }

  /** The language of the page around the component, for plural forms. */
  private lang() {
    return (
      this.host.nativeElement.closest('[lang]')?.getAttribute('lang') || 'en'
    );
  }
}
