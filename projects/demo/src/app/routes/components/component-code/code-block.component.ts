import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CodeLanguage, highlight } from './highlight';

/** A block of code, highlighted by Shiki, with a button to copy it. */
@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  code = input.required<string>();
  lang = input.required<CodeLanguage>();

  private sanitizer = inject(DomSanitizer);

  // Shiki colours tokens with inline styles, which Angular's sanitiser would
  // strip. The HTML is safe to trust: it is Shiki's output for this site's own
  // example files, with the source text escaped.
  highlighted = resource({
    params: () => ({ code: this.code(), lang: this.lang() }),
    loader: async ({ params }) =>
      this.sanitizer.bypassSecurityTrustHtml(
        await highlight(params.code, params.lang),
      ),
  });

  /** True for a moment after the code is copied, to confirm it worked. */
  copied = signal(false);
  private copiedTimer?: ReturnType<typeof setTimeout>;

  async copy() {
    try {
      await navigator.clipboard.writeText(this.code());
    } catch {
      // Clipboard access can be refused; the code can still be selected.
      return;
    }
    this.copied.set(true);
    clearTimeout(this.copiedTimer);
    this.copiedTimer = setTimeout(() => this.copied.set(false), 2000);
  }
}
