import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminDashboardService } from '../../../admin-dashboard/admin-dashboard.service';
import { SubTaskService } from '../sub-task.service';
import { AlertService } from '../../../../core/services/alert/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-task-create',
  templateUrl: './sub-task-create.component.html',
  styleUrls: ['./sub-task-create.component.scss']
})
export class SubTaskCreateComponent implements OnInit {

  subTaskForm!: FormGroup;
  uploadedFileNames: string[] = [];

  users: any;
  loadingUploadFile = false;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private subTaskService: SubTaskService,
              private alertService: AlertService,
              public dialogRef: MatDialogRef<SubTaskCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private adminDashboardService: AdminDashboardService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.addFile();
    this.getUsers();
    console.log(this.data);
  }

  createForm(): void {
    this.subTaskForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      task: [this.data.taskId, [Validators.required]],
      message: ['', [Validators.required]],
      fileList: this.formBuilder.array([])
    });
  }

  get files(): FormArray {
    return this.subTaskForm.controls['fileList'] as FormArray;
  }

  addFile() {
    const fileForm = this.formBuilder.group({
      file: ['', Validators.required],
      fileName: ['']
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

  async addFileObject(files: any, formControlName: string, index: number): Promise<any> {
    this.loadingUploadFile = true;
    files = files?.target?.files;
    this.files.at(index).get('fileName')?.setValue(files.item(0).name);
    this.files.at(index).get('file')?.setValue(files.item(0));
    const formData = new FormData();
    formData.append('file', this.files.at(index).get('file')?.value);
    this.subTaskService.uploadFile(formData).subscribe(
      response => {
        this.loadingUploadFile = false;
        this.uploadedFileNames.push(response.name);
      }, error => {
        this.alertService.messageError('دربارگذاری فایل خطایی رخ داده است');
        this.loadingUploadFile = false;
      }
    );
  }

  triggerFileSelect(id: number): void {
    document.getElementById(id.toString())?.click();
  }

  submitSubTask(): void {
    console.log(this.uploadedFileNames);
    this.subTaskForm.addControl('files', new FormControl());
    this.subTaskForm.get('files')?.setValue(this.uploadedFileNames);
    delete this.subTaskForm.value.fileList;
    this.subTaskService.createSubTask(this.subTaskForm.value).subscribe(
      response => {
        this.dialogRef.close(true);
        this.alertService.messageSuccess('عملیات با موفقیت انجام شد');
      }, error => this.alertService.messageError(error)
    );
  }


}
