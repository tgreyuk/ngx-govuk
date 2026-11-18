/**
 * Writes `projects/website/generated/sitemap.xml`, listing every page of the
 * docs site for search engines: the guides, each documented component's
 * examples and API pages, and the other top-level pages.
 *
 * The build copies it to the site's root. Run it with
 * `npm run website:sitemap`.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMPONENTS } from '../projects/website/src/app/routes/components/components.data.ts';
import { GUIDES } from '../projects/website/src/app/routes/get-started/get-started.data.ts';

const SITE_URL = 'https://www.ngx-govuk.org';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'projects/website/generated/sitemap.xml');

/** The site's pages, as paths from the root. */
export function sitePaths(): string[] {
  return [
    '/',
    '/get-started',
    ...GUIDES.map((guide) => guide.path),
    '/components',
    ...COMPONENTS.filter((c) => c.status === 'documented').flatMap((c) => [
      `/components/${c.id}`,
      `/components/${c.id}/api`,
    ]),
    '/support',
  ];
}

export function sitemap(paths: string[]): string {
  const urls = paths
    .map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const paths = sitePaths();
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, sitemap(paths));
  console.log(`Wrote ${paths.length} pages to ${out}`);
}
