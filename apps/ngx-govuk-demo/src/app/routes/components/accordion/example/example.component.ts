import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-govuk-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {}
