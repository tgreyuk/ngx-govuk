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
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxGovukTabComponent {
  label = input.required<string>();
  selected = model<boolean>(false);
}
