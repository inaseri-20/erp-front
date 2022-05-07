import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SubTaskListComponent } from '../../sub-task/sub-task-list/sub-task-list.component';
import { MatDialog } from '@angular/material/dialog';

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
        el.assigneeTooltip = 'انتساب داده شده به ' + el?.assignee_full_name
        el.ownerTooltip = 'ایجاد شده توسط ' + el?.owner_full_name
      })
    }
  }


  openSubTasks(id: any, event: MouseEvent) {
    event.preventDefault();
    this.matDialog.open(SubTaskListComponent, { width: '800px', data: { taskId: id } });
  }
}
