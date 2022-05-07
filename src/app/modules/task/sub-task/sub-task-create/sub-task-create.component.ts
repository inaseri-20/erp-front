import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { SubTaskService } from '../sub-task.service';
import { AlertService } from '../../../../core/services/alert/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CleanObjectService } from '../../../../core/services/api/clean-object.service';
import { TaskService } from '../../task.service';

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
  statuses: any;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private subTaskService: SubTaskService,
              private alertService: AlertService,
              private cleanObjectService: CleanObjectService,
              private taskService: TaskService,
              public dialogRef: MatDialogRef<SubTaskCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getUsers();
    this.getTaskStatuses();
    if (this.data.data) {
      this.subTaskForm.patchValue(this.data.data);
      const files: any = [];
      this.data.data.files.forEach((el: any) => {
        files.push({
          file: 'not selected',
          fileName: el
        });
        this.addFile();
      });
      this.subTaskForm.get('fileList')?.setValue(files);
    } else {
      this.addFile();
    }
  }

  createForm(): void {
    this.subTaskForm = this.formBuilder.group({
      assign: ['', [Validators.required]],
      task: [this.data.taskId, [Validators.required]],
      message: ['', [Validators.required]],
      status: ['', [Validators.required]],
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
    this.dashboardService.getClients().subscribe(
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
    if (this.data.data) {
      if (this.uploadedFileNames.length !== 0) {
        this.subTaskForm.addControl('files', new FormControl());
        this.subTaskForm.get('files')?.setValue(this.uploadedFileNames);
      }
      delete this.subTaskForm.value.fileList;
      delete this.subTaskForm.value.task;
      const submitData = this.cleanObjectService.clean(this.subTaskForm.value)
      this.subTaskService.updateSubTask(submitData, this.data.data.id).subscribe(
        response => {
          this.alertService.messageSuccess('عملیات به روز رسانی با موفقیت انجام شد');
          this.dialogRef.close(true);
        }
      );
    } else {
      delete this.subTaskForm.value.fileList;
      const submitData = this.cleanObjectService.clean(this.subTaskForm.value)
      this.subTaskService.createSubTask(submitData).subscribe(
        response => {
          this.dialogRef.close(true);
          this.alertService.messageSuccess('عملیات با موفقیت انجام شد');
        }, error => this.alertService.messageError(error)
      );
    }
  }

  getTaskStatuses(): void {
    this.taskService.getStatues().subscribe(
      response => {
        this.statuses = response;
      }
    );
  }


}
