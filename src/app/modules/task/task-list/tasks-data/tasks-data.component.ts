import { Component, Input, OnInit } from '@angular/core';
import { SubTaskListComponent } from '../../sub-task/sub-task-list/sub-task-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-data',
  templateUrl: './tasks-data.component.html',
  styleUrls: ['./tasks-data.component.scss']
})
export class TasksDataComponent implements OnInit {

  @Input() taskData: any;
  @Input() projectId: any;

  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openSubTasks(id: any, event: MouseEvent) {
    event.preventDefault();
    this.matDialog.open(SubTaskListComponent, { width: '600px', data: { taskId: id } });
  }
}
