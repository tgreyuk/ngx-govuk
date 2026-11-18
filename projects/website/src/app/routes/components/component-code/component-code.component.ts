import { httpResource } from '@angular/common/http';
import { booleanAttribute, Component, computed, input } from '@angular/core';
import { CodeBlockComponent } from './code-block.component';

/**
 * Shows the template of a component's demo, which the build copies to
 * `examples/`. Most demos need only the template: the API section has the
 * imports. When the template uses members of the class, the class is shown
 * too. Each block is labelled.
 */
@Component({
  selector: 'ngx-govuk-example-code',
  imports: [CodeBlockComponent],
  templateUrl: './component-code.component.html',
})
export class ComponentCodeComponent {
  /** The demo's path under `examples/`, such as "button/secondary". */
  path = input<string>('');

  /** Also shows the demo's class, for demos whose template uses its members. */
  showComponentCode = input(false, { transform: booleanAttribute });

  // Both reload when path changes: the router reuses the page when
  // moving from one component to another.
  template = httpResource.text(
    () => `./examples/${this.path()}.component.html`,
  );
  // An undefined URL skips the request.
  component = httpResource.text(() =>
    this.showComponentCode()
      ? `./examples/${this.path()}.component.ts`
      : undefined,
  );

  // Trailing newlines would add an empty last line to the code block.
  templateCode = computed(() => this.template.value()?.trimEnd());
  componentCode = computed(() => this.component.value()?.trimEnd());
}
