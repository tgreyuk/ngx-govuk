import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxGovukTextInput } from 'ngx-govuk/text-input';

@Component({
  selector: 'app-text-input-demo',
  standalone: true,
  imports: [CommonModule, NgxGovukTextInput],
  template: ` <input type="text" ngxGovukTextInput width="three-quarters" /> `,
})
export class TextInputDemoComponent {}
