import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableSearchMode } from '../../../share/components/table/table.component';

@Component({
  selector: 'app-assign-user-to-department',
  templateUrl: './assign-user-to-department.component.html',
  styleUrls: ['./assign-user-to-department.component.scss']
})
export class AssignUserToDepartmentComponent implements OnInit {

  clients: any;
  assignForm!: FormGroup;

  departmentUsers: any;
  columns = [
    {
      name: 'نام کاربر',
      id: 'user_full_name',
      type: 'string',
      minWidth: '150px',
      headerAlign: 'center',
      dataAlign: 'center'
    },
    {
      name: 'نام کاربری',
      id: 'user_username',
      type: 'string',
      minWidth: '150px',
      headerAlign: 'center',
      dataAlign: 'center'
    },
    {
      name: 'نام دپارتمان',
      id: 'department_name',
      type: 'string',
      minWidth: '150px',
      headerAlign: 'center',
      dataAlign: 'center'
    },
    {
      name: 'عملیات',
      id: 'operation',
      type: 'operation',
      minWidth: '130px',
      headerAlign: 'center',
      dataAlign: 'center',
      sticky: true,
      operations: [
        {
          name: 'حذف انتساب',
          icon: 'delete',
          color: 'warn',
          operation: (row: any) => {
            const filter = { department: this.data.id, user: row.user };
            this.dashboardService.deleteDepartmentUser(filter).subscribe(
              response => {
                this.getDepartmentUsers();
              }
            );
          }
        }
      ]
    }
  ];

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
    this.getDepartmentUsers();
  }

  getClients(): void {
    this.dashboardService.getClients().subscribe(
      response => {
        this.clients = response;
      }
    );
  }

  getDepartmentUsers(): void {
    const filter = { department: this.data.id };
    this.dashboardService.getDepartmentUsers(filter).subscribe(
      response => {
        this.departmentUsers = response;
      }
    );
  }

  submitForm(): void {
    this.assignForm.get('user')?.value.forEach((el: any) => {
      const submitData = {
        department: this.data.id,
        user: el
      };
      this.dashboardService.assignUserToDepartment(submitData).subscribe(response => {
        this.getDepartmentUsers();
      });
    });
  }

}
