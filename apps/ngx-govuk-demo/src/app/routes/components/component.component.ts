import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-govuk-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component.component.html',
  styleUrl: './component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentComponent {}
