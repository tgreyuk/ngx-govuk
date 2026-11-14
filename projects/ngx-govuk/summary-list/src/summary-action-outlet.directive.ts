import {
  Directive,
  effect,
  EmbeddedViewRef,
  inject,
  input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

/**
 * Renders a summary list or card action, and adds the card's title to the
 * end of its visually hidden text, as GOV.UK Frontend does, so screen reader
 * users hear which card the link is for.
 *
 * Used only inside this entry point; it isn't exported.
 */
@Directive({
  selector: '[ngxGovukSummaryActionOutlet]',
})
export class NgxGovukSummaryActionOutlet {
  private renderer = inject(Renderer2);
  private viewContainer = inject(ViewContainerRef);

  /** The action's template. */
  template = input.required<TemplateRef<unknown>>({
    alias: 'ngxGovukSummaryActionOutlet',
  });

  /** The card's title, if the action is in a card. */
  cardTitle = input<string>();

  constructor() {
    // Rendering again when the title changes also removes the old title.
    effect(() => {
      this.viewContainer.clear();
      const view = this.viewContainer.createEmbeddedView(this.template());
      this.addTitle(view, this.cardTitle());
    });
  }

  private addTitle(view: EmbeddedViewRef<unknown>, title: string | undefined) {
    if (!title) return;

    for (const root of view.rootNodes) {
      if (!(root instanceof HTMLElement)) continue;
      const text = this.renderer.createText(` (${title})`);
      const hidden = root.querySelector('.govuk-visually-hidden');
      if (hidden) {
        this.renderer.appendChild(hidden, text);
      } else {
        const span = this.renderer.createElement('span');
        this.renderer.addClass(span, 'govuk-visually-hidden');
        this.renderer.appendChild(span, text);
        this.renderer.appendChild(root, span);
      }
    }
  }
}
