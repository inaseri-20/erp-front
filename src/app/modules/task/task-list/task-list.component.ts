import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];
  projectId: any;

  constructor(public router: Router,
              private taskService: TaskService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.params['projectId'];
    this.getProjectTasks();
  }

  getProjectTasks(): void {
    const queryParams = { project: this.projectId };
    this.taskService.getProjectTasks(queryParams).subscribe(
      response => {
        this.tasks = response;
      }
    );
  }

}
