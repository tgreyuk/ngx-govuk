import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxGovukButton, NgxGovukButtonGroup } from 'ngx-govuk/button';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, NgxGovukButtonGroup, NgxGovukButton],
  template: `<ngx-govuk-button-group>
    <button ngxGovukButton>Default</button>

    <button ngxGovukButton buttonType="secondary">Secondary</button>

    <button ngxGovukButton buttonType="warning">Warning</button>

    <button ngxGovukButton disabled>Disabled</button>

    <a href="#" ngxGovukButton buttonType="start">Start</a>
  </ngx-govuk-button-group>`,
})
export class ButtonDemoComponent {}
