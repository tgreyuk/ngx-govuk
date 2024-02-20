import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-govuk-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiComponent {}
