import { Component } from '@angular/core';
import { NgxGovukTag } from 'ngx-govuk/tag';

@Component({
  selector: 'app-tag-colours-demo',
  imports: [NgxGovukTag],
  templateUrl: './colours.component.html',
  // Keep the spaces between the tags, which Angular removes by default.
  preserveWhitespaces: true,
})
export class TagColoursDemoComponent {}
