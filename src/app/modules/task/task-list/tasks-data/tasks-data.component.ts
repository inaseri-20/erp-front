import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SubTaskListComponent } from '../../sub-task/sub-task-list/sub-task-list.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks-data',
  templateUrl: './tasks-data.component.html',
  styleUrls: ['./tasks-data.component.scss']
})
export class TasksDataComponent implements OnInit, OnChanges {

  @Input() taskData: any;
  @Input() projectId: any;

  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.taskData) {
      this.taskData.forEach((el: any) => {
        const startDate = moment(new Date(el?.start_date));
        const deadLine = moment(new Date(el?.dead_line));
        const today = moment(new Date());
        const allDays = deadLine.diff(startDate, 'days') + 1;
        const remainingDays = deadLine.diff(today, 'days') + 1;
        const deadLineLimit = (remainingDays / allDays) * 100;
        const alert: any = {};

        switch (true) {
          case (Math.ceil(deadLineLimit) < 10):
            alert['deadLineLimitValue'] = Math.ceil(deadLineLimit);
            alert['deadLineLimitColor'] = '#f72302';
            break;
          case (Math.ceil(deadLineLimit) < 40):
            alert['deadLineLimitValue'] = Math.ceil(deadLineLimit);
            alert['deadLineLimitColor'] = '#8f9704';
            break;
          case (Math.ceil(deadLineLimit) < 70):
            alert['deadLineLimitValue'] = Math.ceil(deadLineLimit);
            alert['deadLineLimitColor'] = '#f77002';
            break;
          default:
            alert['deadLineLimitValue'] = Math.ceil(deadLineLimit);
            alert['deadLineLimitColor'] = '#014513';
            break;
        }

        el.alert = alert;
        el.assigneeTooltip = 'انتساب داده شده به ' + el?.assignee_full_name;
        el.ownerTooltip = 'ایجاد شده توسط ' + el?.owner_full_name;
      });
    }
  }


  openSubTasks(id: any, event: MouseEvent) {
    event.preventDefault();
    this.matDialog.open(SubTaskListComponent, { width: '800px', data: { taskId: id } });
  }
}
