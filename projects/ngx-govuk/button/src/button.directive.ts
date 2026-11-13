import {
  Directive,
  ElementRef,
  HostBinding,
  Renderer2,
  effect,
  input,
  inject,
} from '@angular/core';
/**
 * Styles a `button` or `a` element as a GOV.UK button.
 *
 * Use a `button` for actions, such as saving answers, and an `a` for links
 * that look like buttons, such as a start button.
 */
@Directive({
  selector: 'a[ngxGovukButton], button[ngxGovukButton]',
})
export class NgxGovukButton {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostBinding('class') get className() {
    const classes = ['govuk-button'];
    if (this.buttonType()) {
      classes.push(`govuk-button--${this.buttonType()}`);
    }
    if (this.inversed()) {
      classes.push('govuk-button--inverse');
    }
    return classes.join(' ');
  }

  /**
   * The kind of button: `secondary` for less important actions, `warning` for
   * actions that delete something or can't be undone, and `start` for the
   * button that starts a service. Leave it unset for the main action on a
   * page.
   */
  buttonType = input<'secondary' | 'warning' | 'start'>();

  /**
   * Shows the button in white, for use on a dark background.
   */
  inversed = input<boolean>(false);

  constructor() {
    effect(() => {
      if (this.buttonType() === 'start') {
        const svgContainer = this.renderer.createElement('div');
        svgContainer.innerHTML = `<svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
  </svg>`;
        this.renderer.appendChild(
          this.elementRef.nativeElement,
          svgContainer.firstChild,
        );
      } else {
        const svgElement = this.elementRef.nativeElement.querySelector('svg');
        if (svgElement) {
          svgElement.remove();
        }
      }
    });
  }
}
