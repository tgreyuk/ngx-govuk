import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxGovukButton } from 'ngx-govuk/button';

@Component({
  selector: 'ngx-govuk-home',
  imports: [RouterLink, NgxGovukButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
