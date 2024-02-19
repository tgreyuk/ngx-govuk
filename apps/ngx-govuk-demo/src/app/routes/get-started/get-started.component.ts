import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngx-govuk-get-started',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetStartedComponent {
  INSTALL_CODE = `npm install govuk-frontend ngx-govuk --save`;

  STYLES_CODE = `"styles": [
  "node_modules/govuk-frontend/dist/govuk/all.scss"
]`;

  COMPONENT_CODE = `import { NgxGovukDetailsComponent } from 'ngx-govuk/details';

@Component({
  selector: 'my-consumer-component',
  standalone: true,
  imports: [CommonModule, NgxGovukDetailsComponent],
  templateUrl: '<ngx-govuk-details>...</ngx-govuk-details>',
})`;
}
