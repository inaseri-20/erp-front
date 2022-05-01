import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminDashboardService } from '../admin-dashboard.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import jwt_decode from 'jwt-decode';
import { CleanObjectService } from '../../../core/services/api/clean-object.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  projectForm!: FormGroup;

  clients: any;
  statuses: any;
  departments: any;

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              public activatedRoute: ActivatedRoute,
              private cleanObjectService: CleanObjectService,
              private adminDashboardService: AdminDashboardService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getStatues();
    this.getClients();
    this.getDepartments();
    if (this.activatedRoute.snapshot.queryParams['projectId']) {
      this.getProjectDetail();
    }
  }

  getStatues(): void {
    this.adminDashboardService.getStatues().subscribe(
      response => {
        this.statuses = response;
      }
    );
  }

  getClients(): void {
    this.adminDashboardService.getClients().subscribe(
      response => {
        this.clients = response;
      }
    );
  }

  getDepartments(): void {
    this.adminDashboardService.getDepartments().subscribe(
      response => {
        this.departments = response;
      }
    );
  }

  getProjectDetail(): void {
    this.adminDashboardService.getProject(this.activatedRoute.snapshot.queryParams['projectId']).subscribe(
      response => {
        this.projectForm.patchValue(response);
      }
    );
  }

  createForm(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      status: [],
      owner: ['', [Validators.required]],
      department: ['', [Validators.required]],
      dead_line: [''],
      start_date: ['']
    });

    if (JSON.stringify(localStorage.getItem('group')).includes('middle')) {
      const userId: any = jwt_decode(JSON.stringify(localStorage.getItem('erpAccessToken')));
      this.projectForm.get('owner')?.setValue(userId.user_id);
      this.projectForm.get('owner')?.disable();
    }
  }

  setDate(date: any, datePickerType: string): any {
    let convertedDate = new Date(date.gregorianDate).toISOString();
    this.projectForm.get(datePickerType)?.setValue(convertedDate);
  }

  submitProject(): void {
    const submitData = this.cleanObjectService.clean(this.projectForm.getRawValue());
    if (this.activatedRoute.snapshot.queryParams['projectId']) {
      this.adminDashboardService.updateProject(submitData, this.activatedRoute.snapshot.queryParams['projectId']).subscribe(
        response => {
          this.router.navigate(['/admin/dashboard']);
        }, error => this.alertService.messageError(error)
      );
    } else {
      this.adminDashboardService.createProject(submitData).subscribe(
        response => {
          this.router.navigate(['/admin/dashboard']);
        }, error => this.alertService.messageError(error)
      );
    }
  }

  deleteProject(): void {
    this.adminDashboardService.deleteProject(this.activatedRoute.snapshot.queryParams['projectId']).subscribe(
      response => {
        this.router.navigate(['/admin/dashboard']);
      }, error => this.alertService.messageError(error)
    );
  }
}
