import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/services/alert/alert.service';
import { TaskService } from '../task.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { CleanObjectService } from '../../../core/services/api/clean-object.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskForm!: FormGroup;

  statuses: any;
  projects: any;
  users: any;

  constructor(public router: Router,
              private taskService: TaskService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              public activatedRoute: ActivatedRoute,
              private cleanObjectService: CleanObjectService,
              private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.getStatues();
    this.getProjects();
    this.createForm();
    this.getUsers();
    if (this.activatedRoute.snapshot.queryParams['taskId']) {
      this.getTaskDetail();
      this.taskForm.addControl('done', new FormControl())
    }
  }

  createForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      status: [],
      project: ['', [Validators.required]],
      assign: ['', [Validators.required]],
      dead_line: [''],
      start_date: ['']
    });
  }

  getStatues(): void {
    this.dashboardService.getStatues().subscribe(
      response => {
        this.statuses = response;
      }
    );
  }

  getProjects(): void {
    this.dashboardService.getProjects().subscribe(
      response => {
        this.projects = response;
      }
    );
  }

  getTaskDetail(): void {
    this.taskService.getTaskDetail(this.activatedRoute.snapshot.queryParams['taskId']).subscribe(
      response => {
        this.taskForm.patchValue(response);
        this.taskForm.get('project')?.setValue(response?.project?.id);
      }
    );
  }

  getUsers(): void {
    this.dashboardService.getClients().subscribe(
      response => {
        this.users = response;
      }, error => this.alertService.messageError(error)
    );
  }

  submitTask() {
    const data = this.cleanObjectService.clean(this.taskForm.value);
    if (this.activatedRoute.snapshot.queryParams['taskId']) {
      this.taskService.updateTask(data, this.activatedRoute.snapshot.queryParams['taskId']).subscribe(
        response => {
          this.alertService.messageSuccess('تسک با موفقیت به روز رسانی شد');
          this.router.navigate(['/task']);
        }, error => this.alertService.messageError(error)
      );
    } else {
      this.taskService.createTask(data).subscribe(
        response => {
          this.alertService.messageSuccess('تسک با موفقیت ذخیره شد');
          this.router.navigate(['/task']);
        }, error => this.alertService.messageError(error)
      );
    }
  }

  setDate(date: any, datePickerType: string): any {
    let convertedDate = new Date(date.gregorianDate).toISOString();
    this.taskForm.get(datePickerType)?.setValue(convertedDate);
  }

  deleteTask() {
    this.taskService.deleteTask(this.activatedRoute.snapshot.queryParams['taskId']).subscribe(
      response => {
        this.alertService.messageSuccess('حذف تسک با موفقیت انجام شد');
        this.router.navigate(['/task/' + this.activatedRoute.snapshot.queryParams['projectId']]);
      }, error => this.alertService.messageError(error)
    );
  }
}
