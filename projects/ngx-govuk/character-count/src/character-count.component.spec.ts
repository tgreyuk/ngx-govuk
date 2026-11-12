import { Component, DebugElement, Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { NgxGovukFormGroup } from '../../form-group/src';
import { NgxGovukUtilsService } from '../../src';
import { NgxGovukTextarea } from '../../textarea/src';
import { NgxGovukCharacterCount } from './character-count.component';

@Component({
  selector: 'ngx-govuk-host-component',
  standalone: true,
  providers: [
    MockProvider(NgxGovukUtilsService, {
      randomId(prefix: string): string {
        return prefix + '-someId';
      },
    }),
  ],
  imports: [NgxGovukCharacterCount, NgxGovukFormGroup, NgxGovukTextarea],
  template: `<ngx-govuk-character-count [limit]="20">
    <ngx-govuk-form-group
      [asPageHeading]="true"
      label="Can you provide more detail?"
      hint="Do not include personal or financial information like your National Insurance number or credit card details."
    >
      <textarea ngxGovukTextarea></textarea>
    </ngx-govuk-form-group>
  </ngx-govuk-character-count>`,
})
class HostComponent {}

describe('NgxGovukCharacterCount', () => {
  let component: NgxGovukCharacterCount;
  let fixture: ComponentFixture<HostComponent>;
  let debugElement: DebugElement;
  let renderer1: Renderer2;
  let renderer2: Renderer2;
  let fgdebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukCharacterCount],
      providers: [Renderer2],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(
      By.directive(NgxGovukCharacterCount),
    );
    fgdebugElement = fixture.debugElement.query(
      By.directive(NgxGovukFormGroup),
    );
    component = debugElement.componentInstance;

    renderer1 = debugElement.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>,
    );

    renderer2 = fgdebugElement.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>,
    );
    fixture.detectChanges();
    vi.spyOn(renderer1, 'setAttribute').mockImplementation(() => undefined);
    vi.spyOn(renderer2, 'setAttribute').mockImplementation(() => undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
