import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NgxGovukTag } from 'ngx-govuk/tag';
import { NgxGovukTaskListItem } from './task-list-item.component';
import { NgxGovukTaskList } from './task-list.directive';

@Component({
  imports: [NgxGovukTaskList, NgxGovukTaskListItem, NgxGovukTag],
  template: `<ul ngxGovukTaskList>
    <li ngxGovukTaskListItem titleText="Company Directors" link="/directors">
      Completed
    </li>
    <li
      ngxGovukTaskListItem
      titleText="Financial history"
      link="/financial-history"
      hint="Include 5 years of the company’s relevant financial information"
    >
      <strong ngxGovukTag>Incomplete</strong>
    </li>
    <li ngxGovukTaskListItem titleText="Submit and pay" [cannotStartYet]="true">
      Cannot start yet
    </li>
  </ul>`,
})
class TestHostComponent {}

function render() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const element = fixture.nativeElement as HTMLElement;
  // Ids are random; give them fixed values so the snapshot is stable.
  element.querySelectorAll('[id]').forEach((node, i) => {
    const old = node.id;
    node.id = `id-${i}`;
    element
      .querySelectorAll(`[aria-describedby~="${old}"]`)
      .forEach((link) =>
        link.setAttribute(
          'aria-describedby',
          link.getAttribute('aria-describedby')!.replace(old, node.id),
        ),
      );
  });
  return element;
}

describe('NgxGovukTaskList', () => {
  it('matches the GOV.UK markup snapshot', () => {
    expect(render()).toMatchSnapshot();
  });

  it('describes each link by its hint and status', () => {
    const element = render();
    for (const link of Array.from(element.querySelectorAll('a'))) {
      const item = link.closest('li')!;
      const ids = [
        item.querySelector('.govuk-task-list__hint')?.id,
        item.querySelector('.govuk-task-list__status')?.id,
      ].filter(Boolean);
      expect(link.getAttribute('aria-describedby')).toBe(ids.join(' '));
    }
  });

  it('shows a task without a link as text', () => {
    const items = render().querySelectorAll('li');
    expect(items[2].querySelector('a')).toBeNull();
    expect(items[2].classList).not.toContain(
      'govuk-task-list__item--with-link',
    );
    expect(items[0].classList).toContain('govuk-task-list__item--with-link');
  });
});
