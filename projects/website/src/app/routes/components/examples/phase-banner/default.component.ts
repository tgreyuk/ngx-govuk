import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxGovukPhaseBanner } from 'ngx-govuk/phase-banner';

@Component({
  selector: 'app-phase-banner-demo',
  imports: [RouterLink, NgxGovukPhaseBanner],
  templateUrl: './default.component.html',
})
export class PhaseBannerDemoComponent {}
