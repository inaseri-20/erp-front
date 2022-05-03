import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-user-to-department',
  templateUrl: './assign-user-to-department.component.html',
  styleUrls: ['./assign-user-to-department.component.scss']
})
export class AssignUserToDepartmentComponent implements OnInit {

  clients: any;
  assignForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AssignUserToDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.assignForm = this.formBuilder.group({
      user: ['', []]
    });
    this.getClients();
  }

  getClients(): void {
    this.dashboardService.getClients().subscribe(
      response => {
        this.clients = response;
      }
    );
  }

  submitForm(): void {
    this.assignForm.get('user')?.value.forEach((el: any) => {
      const submitData = {
        department: this.data.id,
        user: el
      };
      this.dashboardService.assignUserToDepartment(submitData).subscribe();
    });
  }

}
