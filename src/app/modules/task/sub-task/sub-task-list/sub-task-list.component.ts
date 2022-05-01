import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SubTaskCreateComponent } from '../sub-task-create/sub-task-create.component';
import { SubTaskService } from '../sub-task.service';

@Component({
  selector: 'app-sub-task-list',
  templateUrl: './sub-task-list.component.html',
  styleUrls: ['./sub-task-list.component.scss']
})
export class SubTaskListComponent implements OnInit {

  taskId = this.activatedRoute.snapshot.params['taskId'];

  constructor(public router: Router,
              private matDialog: MatDialog,
              private subTaskService: SubTaskService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getSubTasks();
  }

  openCreateSubTask(): void {
    this.matDialog.open(SubTaskCreateComponent, {
      width: '600px',
      height: '600px',
      data: { taskId: this.taskId }
    }).afterClosed();
  }

  getSubTasks(): void {
    const filters = { task: this.taskId };
    this.subTaskService.getSubTasks(filters).subscribe(
      response => {

      }
    )
  }

}
