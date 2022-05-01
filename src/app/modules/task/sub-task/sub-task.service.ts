import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {

  fileBaseApi = `${environment.apiUrl}file/`;
  subTaskBaseApi = `${environment.apiUrl}task/data/`;

  constructor(private apiService: ApiService) {
  }

  uploadFile(data: any): Observable<any> {
    const header = {
      Authorization: `Bearer ${localStorage.getItem('erpAccessToken')}`
    };
    return this.apiService.post(this.fileBaseApi, header, null, data);
  }

  createSubTask(data: any): Observable<any> {
    return this.apiService.post(this.subTaskBaseApi, null, null, data);
  }

  updateSubTask(data: any, subTaskId: number): Observable<any> {
    return this.apiService.put(`${this.subTaskBaseApi}${subTaskId}/`, null, null, data);
  }

  getSubTasks(filters: any): Observable<any> {
    return this.apiService.get(this.subTaskBaseApi, null, filters);
  }

}
