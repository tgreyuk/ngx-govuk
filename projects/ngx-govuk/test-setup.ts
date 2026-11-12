/**
 * Vitest setup for ngx-govuk.
 *
 * Snapshot tests should only record the markup that matters for GOV.UK
 * Frontend's CSS. This serializer strips Angular's internal artefacts
 * (comment anchors, version stamps and generated attributes) so snapshots
 * don't churn on Angular upgrades.
 */
import { expect } from 'vitest';

const ANGULAR_ATTRIBUTE =
  /^(ng-version|ng-reflect-.*|_ngcontent-.*|_nghost-.*)$/;
const CLEANED = Symbol('ngx-govuk-cleaned');

function clean(node: Node): Node {
  const copy = node.cloneNode(true);
  const walker = document.createTreeWalker(
    copy,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
  );
  const comments: Comment[] = [];
  for (
    let current: Node | null = walker.currentNode;
    current;
    current = walker.nextNode()
  ) {
    if (current instanceof Comment) {
      comments.push(current);
    } else if (current instanceof Element) {
      for (const { name } of Array.from(current.attributes)) {
        if (ANGULAR_ATTRIBUTE.test(name)) current.removeAttribute(name);
      }
      // TestBed gives each fixture's root element a generated id (root0, root1...)
      if (/^root\d+$/.test(current.id)) current.removeAttribute('id');
    }
  }
  comments.forEach((comment) => comment.remove());
  return Object.assign(copy, { [CLEANED]: true });
}

expect.addSnapshotSerializer({
  test: (value) => value instanceof Node && !(CLEANED in value),
  serialize: (value, config, indentation, depth, refs, printer) =>
    printer(clean(value), config, indentation, depth, refs),
});
