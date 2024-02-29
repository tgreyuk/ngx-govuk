import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { NgxGovukUtilsService } from '../../src';
import { NgxGovukTextInput } from '../../text-input/src';
import { NgxGovukFormGroup } from './form-group.component';

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
  imports: [NgxGovukFormGroup, NgxGovukTextInput],
  template: `<ngx-govuk-form-group label="Test label" hint="Test hint">
    <input type="text" ngxGovukTextInput />
  </ngx-govuk-form-group>`,
})
class HostComponent {}

describe('NgxGovukFormGroup', () => {
  let component: NgxGovukFormGroup;
  let fixture: ComponentFixture<HostComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGovukFormGroup],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.directive(NgxGovukFormGroup));
    component = debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check markup snapshot', () => {
    expect(debugElement.nativeElement).toMatchSnapshot();
  });
});
