import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'ngx-govuk-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukTabsPanelComponent {
  label = input.required<string>();
  selected = model<boolean>(false);
}
