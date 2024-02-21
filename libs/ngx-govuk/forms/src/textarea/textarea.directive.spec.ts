import { ElementRef, Renderer2 } from '@angular/core';
import { NgxGovukTextareaDirective } from './textarea.directive';

describe('NgxGovukTextareaDirective', () => {
  it('should create an instance', () => {
    const renderer = {} as Renderer2; // Replace {} with the actual Renderer2 instance
    const elementRef = {} as ElementRef; // Replace {} with the actual ElementRef instance
    const directive = new NgxGovukTextareaDirective(renderer, elementRef);
    expect(directive).toBeTruthy();
  });
});
