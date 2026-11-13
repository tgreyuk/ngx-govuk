import { Type } from '@angular/core';
import { AccordionDemoComponent } from './examples/accordion/default.component';
import { BackLinkDemoComponent } from './examples/back-link/default.component';
import { BreadcrumbsDemoComponent } from './examples/breadcrumbs/default.component';
import { ButtonDefaultDemoComponent } from './examples/button/default.component';
import { ButtonDisabledDemoComponent } from './examples/button/disabled.component';
import { ButtonGroupDemoComponent } from './examples/button/group.component';
import { ButtonSecondaryDemoComponent } from './examples/button/secondary.component';
import { ButtonStartDemoComponent } from './examples/button/start.component';
import { ButtonWarningDemoComponent } from './examples/button/warning.component';
import { DetailsDemoComponent } from './examples/details/default.component';
import { TextInputDemoComponent } from './examples/text-input/default.component';
import { TextInputFixedWidthDemoComponent } from './examples/text-input/fixed-width.component';
import { TextInputFluidWidthDemoComponent } from './examples/text-input/fluid-width.component';

/** One demo on a component's page, shown with its own code. */
export interface Example {
  /**
   * The demo's path under `examples/`, without ".component.ts". The build
   * copies the folder to the site, so its template can be shown as code.
   */
  path: string;
  component: Type<unknown>;
  /** Not needed for the first example, which shows the default. */
  title?: string;
  /**
   * A short, factual line on how to get this variant, such as which input to
   * set. Guidance on when to use it belongs to the GOV.UK Design System.
   */
  description?: string;
}

/** Each documented component's examples, in page order. */
export const EXAMPLES: Record<string, Example[]> = {
  accordion: [{ path: 'accordion/default', component: AccordionDemoComponent }],
  'back-link': [
    { path: 'back-link/default', component: BackLinkDemoComponent },
  ],
  breadcrumbs: [
    { path: 'breadcrumbs/default', component: BreadcrumbsDemoComponent },
  ],
  button: [
    { path: 'button/default', component: ButtonDefaultDemoComponent },
    {
      path: 'button/secondary',
      component: ButtonSecondaryDemoComponent,
      title: 'Secondary button',
      description: 'Set "buttonType" to "secondary".',
    },
    {
      path: 'button/warning',
      component: ButtonWarningDemoComponent,
      title: 'Warning button',
      description: 'Set "buttonType" to "warning".',
    },
    {
      path: 'button/start',
      component: ButtonStartDemoComponent,
      title: 'Start button',
      description:
        'Set "buttonType" to "start" on a link. The button adds the arrow icon.',
    },
    {
      path: 'button/disabled',
      component: ButtonDisabledDemoComponent,
      title: 'Disabled button',
      description: 'Add the native "disabled" attribute.',
    },
    {
      path: 'button/group',
      component: ButtonGroupDemoComponent,
      title: 'Grouping buttons',
      description:
        'Wrap buttons, and any links, in "ngx-govuk-button-group" to lay them out together.',
    },
  ],
  details: [{ path: 'details/default', component: DetailsDemoComponent }],
  'text-input': [
    { path: 'text-input/default', component: TextInputDemoComponent },
    {
      path: 'text-input/fixed-width',
      component: TextInputFixedWidthDemoComponent,
      title: 'Fixed width inputs',
      description:
        'Set "inputWidth" to a number of characters: "30", "20", "10", "5", "4", "3" or "2".',
    },
    {
      path: 'text-input/fluid-width',
      component: TextInputFluidWidthDemoComponent,
      title: 'Fluid width inputs',
      description:
        'Set "inputWidth" to a fraction of its container: "full", "three-quarters", "two-thirds", "one-half", "one-third" or "one-quarter".',
    },
  ],
};
