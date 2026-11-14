import { Component } from '@angular/core';
import { NgxGovukTag } from 'ngx-govuk/tag';
import { NgxGovukTaskList, NgxGovukTaskListItem } from 'ngx-govuk/task-list';

@Component({
  selector: 'app-task-list-demo',
  imports: [NgxGovukTaskList, NgxGovukTaskListItem, NgxGovukTag],
  templateUrl: './default.component.html',
})
export class TaskListDemoComponent {}
