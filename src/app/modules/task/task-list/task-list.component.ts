import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { SubTaskListComponent } from '../sub-task/sub-task-list/sub-task-list.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  myCreatedTasks: any[] = [];
  myAssigneeTasks: any[] = [];

  statuses: any;

  projectId = this.activatedRoute.snapshot.queryParams['projectId'];

  constructor(public router: Router,
              private taskService: TaskService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getMyCreatedTasks();
    this.getMyAssigneeTasks();
    this.getTaskStatuses();
  }

  getMyCreatedTasks(statusIndex?: any): void {
    let queryParams: any = { owner: true };
    if (this.projectId) queryParams['projectId'] = this.projectId;
    if (statusIndex) queryParams['status'] = this.statuses[statusIndex - 1].id;
    this.taskService.getProjectTasks(queryParams).subscribe(
      response => {
        this.myCreatedTasks = response;
      }
    );
  }

  getMyAssigneeTasks(statusIndex?: any): void {
    let queryParams: any = { assign: true };
    if (this.projectId) queryParams['projectId'] = this.projectId;
    if (statusIndex) queryParams['status'] = this.statuses[statusIndex - 1].id;
    this.taskService.getProjectTasks(queryParams).subscribe(
      response => {
        this.myAssigneeTasks = response;
      }
    );
  }

  getTaskStatuses(): void {
    this.taskService.getStatues().subscribe(
      response => {
        this.statuses = response;
      }
    );
  }
}
