import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminDashboardService } from '../admin-dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {

  departmentForm!: FormGroup;

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private adminDashboardService: AdminDashboardService) {
  }

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: []
    });
  }

  submit(): void {
    this.adminDashboardService.creatDepartment(this.departmentForm.value).subscribe(
      response => {
        this.alertService.messageSuccess('دپارتمان با موفقیت ثبت شد');
        this.router.navigate(['/admin/dashboard']);
      }, error => this.alertService.messageError(error)
    );
  }

}
