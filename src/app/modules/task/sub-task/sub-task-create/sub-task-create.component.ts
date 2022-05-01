import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminDashboardService } from '../../../admin-dashboard/admin-dashboard.service';

@Component({
  selector: 'app-sub-task-create',
  templateUrl: './sub-task-create.component.html',
  styleUrls: ['./sub-task-create.component.scss']
})
export class SubTaskCreateComponent implements OnInit {

  taskId = this.activatedRoute.snapshot.params['taskId'];
  subTaskForm!: FormGroup;

  users: any;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private adminDashboardService: AdminDashboardService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.addFile();
    this.getUsers();
  }

  createForm(): void {
    this.subTaskForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      task: [this.taskId, [Validators.required]],
      message: ['', [Validators.required]],
      files: this.formBuilder.array([])
    });
  }

  get files(): FormArray {
    return this.subTaskForm.controls['files'] as FormArray;
  }

  addFile() {
    const fileForm = this.formBuilder.group({
      fileName: ['', Validators.required]
    });
    this.files.push(fileForm);
  }

  deleteFile(fileIndex: number) {
    this.files.removeAt(fileIndex);
  }

  getUsers(): void {
    this.adminDashboardService.getClients().subscribe(
      response => {
        this.users = response;
      }
    );
  }

}
