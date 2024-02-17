import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'ngx-govuk-fieldset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fieldset.component.html',
  styleUrl: './fieldset.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukFieldsetComponent {
  legend = input.required<string>();
  hint = input<string>();
  hintId = nanoid();
}
