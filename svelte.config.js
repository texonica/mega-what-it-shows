import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

const runbook = fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url));

// Build frame for the kb export (the export ships only src/). Pages are .svx (mdsvex);
// `layout: runbook` in frontmatter picks src/lib/layouts/runbook.svelte.
export default {
  extensions: ['.svelte', '.svx'],
  preprocess: [mdsvex({ extensions: ['.svx'], layout: { runbook } })],
  kit: {
    adapter: adapter({ pages: 'build', assets: 'build', strict: false }),
    alias: { '#lib': 'src/lib' },
    prerender: { entries: ['/kb', '/kb/triage/dedupe', '/kb/decisions/0001-dedupe-by-subject', '/kb/incidents/4471'] },
  },
};
