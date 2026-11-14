import { Component } from '@angular/core';
import { NgxGovukCharacterCount } from 'ngx-govuk/character-count';
import { NgxGovukTextarea } from 'ngx-govuk/textarea';

@Component({
  selector: 'app-character-count-words-demo',
  imports: [NgxGovukCharacterCount, NgxGovukTextarea],
  templateUrl: './words.component.html',
})
export class CharacterCountWordsDemoComponent {}
