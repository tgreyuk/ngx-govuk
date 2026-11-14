import type { HighlighterCore } from 'shiki/core';

/**
 * `angular-html` for templates and `angular-ts` for components. The guides
 * also show shell commands, Sass and `angular.json` snippets (`jsonc`, since
 * they carry comments).
 */
export type CodeLanguage =
  'angular-html' | 'angular-ts' | 'shellscript' | 'scss' | 'jsonc';

let highlighter: Promise<HighlighterCore> | undefined;

/**
 * Loads Shiki the first time it is needed, with only the grammars the site
 * uses and one theme, so it stays out of the main bundle. `angular-ts` also highlights
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
        import('shiki/langs/shellscript.mjs'),
        import('shiki/langs/scss.mjs'),
        import('shiki/langs/jsonc.mjs'),
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
