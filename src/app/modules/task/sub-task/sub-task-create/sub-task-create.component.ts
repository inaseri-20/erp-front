import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { SubTaskService } from '../sub-task.service';
import { AlertService } from '../../../../core/services/alert/alert.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CleanObjectService } from '../../../../core/services/api/clean-object.service';
import { TaskService } from '../../task.service';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/api/api.service';
import { BigUploaderService } from '../../../../core/pipes/big-uploader.service';
import { DateTimePickerComponent } from '../../../../share/components/date-time-picker/date-time-picker.component';
import * as moment from 'jalali-moment';

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

  fileUploaded = 0;
  showUploader = false;

  subTaskLogsForm!: FormGroup;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private subTaskService: SubTaskService,
              private alertService: AlertService,
              private cleanObjectService: CleanObjectService,
              private taskService: TaskService,
              private bigUploaderService: BigUploaderService,
              public dialogRef: MatDialogRef<SubTaskCreateComponent>,
              private matDialog: MatDialog,
              private apiService: ApiService,
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
      this.data.data.logs.forEach((el: any, index: number) => {
        this.addLog();
        el.task_data = this.data.taskId;
        moment.locale('fa', { useGregorianParser: true });
        el.start_time_jalali = moment(new Date(el.start_time).toISOString()).format('HH:MM YYYY/MM/DD');
        el.end_time_jalali = moment(new Date(el.end_time).toISOString()).format('HH:MM YYYY/MM/DD');
        this.logs.at(index).patchValue(el);
        this.logs.at(index).disable()
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
    this.subTaskLogsForm = this.formBuilder.group({
      logs: this.formBuilder.array([])
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

  get logs(): FormArray {
    return this.subTaskLogsForm.controls['logs'] as FormArray;
  }

  addLog() {
    const logFrom = this.formBuilder.group({
      task_data: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      start_time_jalali: ['', [Validators.required]],
      end_time_jalali: ['', [Validators.required]]
    });
    this.logs.push(logFrom);
  }

  deleteLog(fileIndex: number) {
    this.logs.removeAt(fileIndex);
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
      const submitData = this.cleanObjectService.clean(this.subTaskForm.value);
      this.subTaskService.updateSubTask(submitData, this.data.data.id).subscribe(
        response => {
          this.alertService.messageSuccess('عملیات به روز رسانی با موفقیت انجام شد');
          this.dialogRef.close(true);
        }
      );
    } else {
      delete this.subTaskForm.value.fileList;
      const submitData = this.cleanObjectService.clean(this.subTaskForm.value);
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

  async addFileObject(files: any, formControlName: string, index: number): Promise<any> {
    files = files?.target?.files;
    this.bigUploaderService.uploaded$.subscribe((results: any) => {
      if (results) {
        this.fileUploaded = results;
      }
    });
    const queryParams = {
      file_name: files.item(0)?.name.toString(),
      size: files.item(0)?.size.toString()
    };
    this.files.disable();
    this.files.at(index).get('fileName')?.setValue(files.item(0)?.name.toString());
    this.showUploader = true;
    const video = await this.uploadFile(queryParams, files.item(0), '4000000');
    this.files.enable();
    this.showUploader = false;
    this.files.at(index).get('file')?.patchValue(video.key);
    this.uploadedFileNames.push(files.item(0)?.name.toString());
  }

  async uploadFile(queryParams: any, file: any, chunkSize: string): Promise<any> {
    const key = await this.apiService.get(`${environment.apiUrl}file/create_key/`, null, queryParams).toPromise();
    const data = { key: key.key, chunk_size: chunkSize };
    const fileSize = await this.taskService.getFileSize(data).toPromise();
    const currentStep = Math.round(fileSize.step);

    if (currentStep && currentStep !== 0) {
      await this.bigUploaderService.uploadFileAgain(file, key.key, fileSize.size, Number(chunkSize));
    } else {
      await this.bigUploaderService.uploadFile(file, key.key, Number(chunkSize));
    }

    return { key: key.key };
  }

  submitLog(index: number) {
    this.logs.at(index).get('task_data')?.setValue(this.data.taskId);
    const submitData = {
      task_data: this.logs.at(index).get('task_data')?.value,
      start_time: this.logs.at(index).get('start_time')?.value,
      end_time: this.logs.at(index).get('end_time')?.value
    };
    this.subTaskService.addSubTaskLog(submitData).subscribe(
      response => {
        this.alertService.messageSuccess('ساعت شما ثبت شد');
        this.logs.at(index).disable();
      }, error => this.alertService.messageError(error)
    );
  }

  openDateTime(formControlName: string, index: number, viewFormControlName: string): void {
    this.matDialog.open(DateTimePickerComponent).afterClosed().subscribe(result => {
      this.logs.at(index).get(viewFormControlName)?.setValue(result?.jalaliDate);
      this.logs.at(index).get(formControlName)?.setValue(result?.gregorianDate);
    });
  }
}
