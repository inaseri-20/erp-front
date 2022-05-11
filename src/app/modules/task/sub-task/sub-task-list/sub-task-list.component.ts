import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubTaskCreateComponent } from '../sub-task-create/sub-task-create.component';
import { SubTaskService } from '../sub-task.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-task-list',
  templateUrl: './sub-task-list.component.html',
  styleUrls: ['./sub-task-list.component.scss']
})
export class SubTaskListComponent implements OnInit {

  taskId = this.activatedRoute.snapshot.params['taskId'];
  subTasks: any;

  constructor(public router: Router,
              private matDialog: MatDialog,
              private subTaskService: SubTaskService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getSubTasks();
  }

  openCreateSubTask(data?: any): void {
    this.matDialog.open(SubTaskCreateComponent, {
      width: '600px',
      data: { taskId: this.taskId, data }
    }).afterClosed().subscribe((result: any) => {
      this.getSubTasks();
    });
  }

  getSubTasks(): void {
    const temp: any = [];
    let filter: any = { task: this.taskId, assign: true };
    this.subTaskService.getSubTasks(filter).subscribe(
      response => {
        response.map((el: any) => {
          el.assignee = 'انتساب به ' + el?.assignee_full_name;
          el.owner = 'ثبت توسط ' + el?.owner_full_name;
          temp.push(el);
        });
        filter = { task: this.taskId, owner: true };
        this.subTaskService.getSubTasks(filter).subscribe(
          response => {
            response.map((el: any) => {
              el.assignee = 'انتساب به ' + el?.assignee_full_name;
              el.owner = 'ثبت توسط ' + el?.owner_full_name;
              temp.push(el);
            });
            this.subTasks = temp;
          }
        );
      }
    );
  }

  download(file: string): void {
    this.subTaskService.getDownloadLink(file).subscribe(
      response => {
        window.open(response?.download_link, '_blank')
      }
    );
  }
}
