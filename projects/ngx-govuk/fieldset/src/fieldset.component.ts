import { Component, input, inject } from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';

@Component({
  selector: 'ngx-govuk-fieldset',
  imports: [],
  templateUrl: './fieldset.component.html',
  styleUrl: './fieldset.component.scss',
})
export class NgxGovukFieldsetComponent {
  private utilsService = inject(NgxGovukUtilsService);

  legend = input.required<string>();
  hint = input<string>();
  asPageHeading = input<boolean>(false);
  hintId = this.utilsService.randomId('hint');
}
