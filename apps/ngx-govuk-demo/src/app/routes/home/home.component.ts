
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxGovukButton } from 'ngx-govuk/button';

@Component({
  selector: 'ngx-govuk-home',
  standalone: true,
  imports: [RouterLink, NgxGovukButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
