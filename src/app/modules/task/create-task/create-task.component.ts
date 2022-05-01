import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/services/alert/alert.service';
import { TaskService } from '../task.service';
import { AdminDashboardService } from '../../admin-dashboard/admin-dashboard.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskForm!: FormGroup;

  statuses: any;
  projects: any;

  constructor(public router: Router,
              private taskService: TaskService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              public activatedRoute: ActivatedRoute,
              private adminDashboardService: AdminDashboardService) {
  }

  ngOnInit(): void {
    this.getStatues();
    this.getProjects();
    this.createForm();
    if (this.activatedRoute.snapshot.queryParams['taskId']) {
      this.getTaskDetail();
    }
  }

  createForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      status: [],
      project: ['', [Validators.required]],
      dead_line: [''],
      start_date: ['']
    });
  }

  getStatues(): void {
    this.adminDashboardService.getStatues().subscribe(
      response => {
        this.statuses = response;
      }
    );
  }

  getProjects(): void {
    this.adminDashboardService.getProjects().subscribe(
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


  submitTask() {
    if (this.activatedRoute.snapshot.queryParams['taskId']) {
      this.taskService.updateTask(this.taskForm.value, this.activatedRoute.snapshot.queryParams['taskId']).subscribe(
        response => {
          this.alertService.messageSuccess('تسک با موفقیت به روز رسانی شد');
          this.router.navigate(['/admin/dashboard']);
        }, error => this.alertService.messageError(error)
      );
    } else {
      this.taskService.createTask(this.taskForm.value).subscribe(
        response => {
          this.alertService.messageSuccess('تسک با موفقیت ذخیره شد');
          this.router.navigate(['/admin/dashboard']);
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
        this.router.navigate(['/admin/dashboard']);
      }, error => this.alertService.messageError(error)
    );
  }
}
