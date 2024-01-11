import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ngx-govuk-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ngx-govuk-breadcrumbs.component.html',
  styleUrl: './ngx-govuk-breadcrumbs.component.scss',
})
export class NgxGovukBreadcrumbsComponent {}
