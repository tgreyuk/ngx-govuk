import {
  Directive,
  ElementRef,
  HostBinding,
  Renderer2,
  effect,
  input,
} from '@angular/core';
/**
 * Directive to be added to native "a" or "button" elements
 *
 * @selector a[ngxGovukButton],button[ngxGovukButton]
 */
@Directive({
  selector: 'a[ngxGovukButton], button[ngxGovukButton]',
  standalone: true,
})
export class NgxGovukButton {
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
   * The type / purpose of the button.
   */
  buttonType = input<'secondary' | 'warning' | 'start'>();

  /**
   * Inverse the button colour scheme for use when placed on dark backgrounds.
   *
   * @initialValue false
   */
  inversed = input<boolean>(false);

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
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
