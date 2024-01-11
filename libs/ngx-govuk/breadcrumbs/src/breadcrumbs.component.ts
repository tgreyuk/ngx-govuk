import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbItem } from './breadcrumbs.component.models';

@Component({
  selector: 'ngx-govuk-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class NgxGovukBreadcrumbsComponent {
  @Input({ required: true }) items!: BreadcrumbItem[];
}
