import { Component } from '@angular/core';
import { NgxGovukCharacterCount } from 'ngx-govuk/character-count';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

@Component({
  selector: 'app-character-count-demo',
  imports: [NgxGovukCharacterCount, NgxGovukTextarea],
  templateUrl: './default.component.html',
})
export class CharacterCountDemoComponent {}
