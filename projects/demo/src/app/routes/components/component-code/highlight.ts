import type { HighlighterCore } from 'shiki/core';

/** `angular-html` for templates; `angular-ts` for components. */
export type CodeLanguage = 'angular-html' | 'angular-ts';

let highlighter: Promise<HighlighterCore> | undefined;

/**
 * Loads Shiki the first time it is needed, with only the Angular grammars and
 * one theme, so it stays out of the main bundle. `angular-ts` also highlights
 * the HTML inside a component's inline `template`.
 */
function getHighlighter() {
  highlighter ??= Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
  ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
    createHighlighterCore({
      themes: [import('shiki/themes/github-light.mjs')],
      langs: [
        import('shiki/langs/angular-html.mjs'),
        import('shiki/langs/angular-ts.mjs'),
      ],
      engine: createJavaScriptRegexEngine(),
    }),
  );
  return highlighter;
}

/** Returns the code as highlighted HTML: a `<pre class="shiki">` element. */
export async function highlight(code: string, lang: CodeLanguage) {
  const shiki = await getHighlighter();
  return shiki.codeToHtml(code, { lang, theme: 'github-light' });
}
