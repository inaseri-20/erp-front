import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';
import {MatDialog} from "@angular/material/dialog";
import {SubTaskListComponent} from "../sub-task/sub-task-list/sub-task-list.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];
  projectId = this.activatedRoute.snapshot.queryParams['projectId'];

  constructor(public router: Router,
              private matDialog: MatDialog,
              private taskService: TaskService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.params['projectId'];
    this.getProjectTasks();
  }

  getProjectTasks(): void {
    let queryParams = {}
    if (this.projectId) {
      queryParams = {project: this.projectId};
    }
    this.taskService.getProjectTasks(queryParams).subscribe(
      response => {
        this.tasks = response;
      }
    );
  }

  openSubTasks(id: any, event: MouseEvent) {
    event.preventDefault();
    this.matDialog.open(SubTaskListComponent, {width: '600px', data: {taskId: id}})
  }
}
