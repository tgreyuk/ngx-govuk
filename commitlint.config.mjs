// Checks commit messages are Conventional Commits, which release-please reads
// to choose the next version and write the changelog. Run by .husky/commit-msg.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Bodies and footers may be unwrapped paragraphs: release-please doesn't
    // mind, and a BREAKING CHANGE footer then reads as one line in the changelog.
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};
