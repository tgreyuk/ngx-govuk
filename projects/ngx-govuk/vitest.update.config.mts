// Used by `npm run lib:test:update` to rewrite snapshots.
// `ng test` has no --update flag, so we pass Vitest's option via config.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { update: true },
});
