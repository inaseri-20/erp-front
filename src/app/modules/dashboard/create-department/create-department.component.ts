import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';
import { MatSelectionList } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { AssignUserToDepartmentComponent } from '../assign-user-to-department/assign-user-to-department.component';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {

  @ViewChild('departmentList') departmentSelectedList!: MatSelectionList;

  departmentForm!: FormGroup;
  departments: any;

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private dashboardService: DashboardService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: []
    });
    this.getDepartments();
  }

  submit(): void {
    this.dashboardService.creatDepartment(this.departmentForm.value).subscribe(
      response => {
        this.alertService.messageSuccess('دپارتمان با موفقیت ثبت شد');
        this.router.navigate(['/admin/dashboard']);
      }, error => this.alertService.messageError(error)
    );
  }

  getDepartments(): void {
    this.dashboardService.getDepartments().subscribe(
      response => {
        this.departments = response;
      }
    );
  }

  openAssignUser(department: any): void {
    this.matDialog.open(AssignUserToDepartmentComponent, { width: '800px', data: department });
  }
}
