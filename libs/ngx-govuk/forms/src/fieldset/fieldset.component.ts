import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
} from '@angular/core';
import { NgxGovukUtilsService } from 'ngx-govuk';

@Component({
  selector: 'ngx-govuk-fieldset',
  standalone: true,
  imports: [],
  templateUrl: './fieldset.component.html',
  styleUrl: './fieldset.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukFieldsetComponent {
  private utilsService = inject(NgxGovukUtilsService);

  legend = input.required<string>();
  hint = input<string>();
  asPageHeading = input<boolean>(false);
  hintId = this.utilsService.randomId('hint');
}
