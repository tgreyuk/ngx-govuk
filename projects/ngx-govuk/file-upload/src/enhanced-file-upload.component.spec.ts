import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxGovukFormGroup } from 'ngx-govuk/form-group';
import { NgxGovukEnhancedFileUpload } from './enhanced-file-upload.component';
import { NgxGovukFileUpload } from './file-upload.directive';

@Component({
  imports: [NgxGovukFormGroup, NgxGovukFileUpload, NgxGovukEnhancedFileUpload],
  template: `<ngx-govuk-form-group
    label="Upload a file"
    hint="Your photo may be in your Pictures folder"
    [errorMessage]="errorMessage()"
  >
    <ngx-govuk-enhanced-file-upload>
      <input
        id="photo"
        type="file"
        ngxGovukFileUpload
        [multiple]="multiple()"
        [disabled]="disabled()"
        (change)="changes = changes + 1"
      />
    </ngx-govuk-enhanced-file-upload>
  </ngx-govuk-form-group>`,
})
class TestHostComponent {
  errorMessage = signal<string | null>(null);
  multiple = signal(false);
  disabled = signal(false);
  changes = 0;
}

async function setup() {
  const fixture = TestBed.createComponent(TestHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  const $ = (selector: string) =>
    element.querySelector(selector) as HTMLElement;
  const button = $('button') as HTMLButtonElement;
  const input = $('input') as HTMLInputElement;
  // jsdom can't make a FileList, so let tests set the input's files.
  Object.defineProperty(input, 'files', { value: [], writable: true });
  const choose = (...names: string[]) => {
    input.files = names.map((name) => new File([''], name)) as never;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  };
  const status = () => $('.govuk-file-upload-button__status').textContent;
  const announcement = () => $('.govuk-file-upload-announcements').textContent;
  return { fixture, element, $, button, input, choose, status, announcement };
}

/** jsdom has no DragEvent or DataTransfer, so fake the parts used. */
function drag(type: string, target: Element, names: string[]) {
  const files = names.map((name) => new File([''], name));
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'dataTransfer', {
    value: {
      files,
      items: files.map(() => ({ kind: 'file' })),
      types: ['Files'],
    },
  });
  target.dispatchEvent(event);
  return event;
}

describe('NgxGovukEnhancedFileUpload', () => {
  afterEach(() => document.body.replaceChildren());

  it('matches the GOV.UK markup snapshot', async () => {
    expect((await setup()).element).toMatchSnapshot();
  });

  it('hides the input behind a button the label points to', async () => {
    const { $, button, input } = await setup();
    const label = $('label');
    expect(input.hasAttribute('hidden')).toBe(true);
    expect(input.id).toBe('photo-input');
    expect(button.id).toBe('photo');
    expect(label.getAttribute('for')).toBe('photo');
    expect(label.id).toBe('photo-label');
    expect(button.getAttribute('aria-labelledby')).toBe(
      'photo-label photo-comma photo',
    );
  });

  it('reads as one sentence to screen readers', async () => {
    const { button } = await setup();
    expect(button.textContent).toBe('No file chosen, Choose file or drop file');
  });

  it('describes the button with the hint and error message', async () => {
    const { fixture, button } = await setup();
    expect(button.getAttribute('aria-describedby')).toBe('photo-hint');

    fixture.componentInstance.errorMessage.set('Select a file');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(button.getAttribute('aria-describedby')).toBe(
      'photo-hint photo-error',
    );
  });

  it('opens the file picker from the button', async () => {
    const { button, input } = await setup();
    const click = vi.spyOn(input, 'click');
    button.click();
    expect(click).toHaveBeenCalled();
  });

  it('shows which files users chose', async () => {
    const { button, choose, status } = await setup();
    expect(status()).toBe('No file chosen');
    expect(button.classList).toContain('govuk-file-upload-button--empty');

    choose('photo.jpg');
    expect(status()).toBe('photo.jpg');
    expect(button.classList).not.toContain('govuk-file-upload-button--empty');

    choose('one.jpg', 'two.jpg');
    expect(status()).toBe('2 files chosen');

    choose();
    expect(status()).toBe('No file chosen');
  });

  it('fills the input with dropped files', async () => {
    const { fixture, button, input, status } = await setup();
    const event = drag('drop', button, ['photo.jpg']);
    fixture.detectChanges();
    expect(event.defaultPrevented).toBe(true);
    expect(Array.from(input.files ?? []).map((file) => file.name)).toEqual([
      'photo.jpg',
    ]);
    expect(fixture.componentInstance.changes).toBe(1);
    expect(status()).toBe('photo.jpg');
  });

  it('takes several dropped files only when the input does', async () => {
    const { fixture, button, status } = await setup();
    drag('drop', button, ['one.jpg', 'two.jpg']);
    fixture.detectChanges();
    expect(fixture.componentInstance.changes).toBe(0);

    fixture.componentInstance.multiple.set(true);
    fixture.detectChanges();
    drag('drop', button, ['one.jpg', 'two.jpg']);
    fixture.detectChanges();
    expect(status()).toBe('2 files chosen');
  });

  it('shows and announces the drop zone while users drag files', async () => {
    const { fixture, button, announcement } = await setup();
    drag('dragenter', button, ['photo.jpg']);
    fixture.detectChanges();
    expect(button.classList).toContain('govuk-file-upload-button--dragging');
    expect(announcement()).toBe('Entered drop zone');

    drag('dragenter', document.body, ['photo.jpg']);
    fixture.detectChanges();
    expect(button.classList).not.toContain(
      'govuk-file-upload-button--dragging',
    );
    expect(announcement()).toBe('Left drop zone');
  });

  it('is disabled with its input', async () => {
    const { fixture, $, button } = await setup();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    // Let the mutation observer see the change.
    await Promise.resolve();
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
    expect($('.govuk-file-upload-wrapper').classList).toContain(
      'govuk-file-upload-wrapper--disabled',
    );
  });
});
