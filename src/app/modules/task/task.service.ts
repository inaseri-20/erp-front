import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core/services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskBaseApi = `${environment.apiUrl}task/`;

  constructor(private apiService: ApiService) {
  }

  createTask(data: any): Observable<any> {
    return this.apiService.post(this.taskBaseApi, null, null, data);
  }

  updateTask(data: any, taskId: any): Observable<any> {
    return this.apiService.put(`${this.taskBaseApi}${taskId}/`, null, null, data);
  }

  deleteTask(taskId: any): Observable<any> {
    return this.apiService.delete(`${this.taskBaseApi}${taskId}/`);
  }

  getProjectTasks(filters?: any): Observable<any> {
    return this.apiService.get(this.taskBaseApi, null, filters);
  }

  getTaskDetail(taskId: any): Observable<any> {
    return this.apiService.get(`${this.taskBaseApi}${taskId}/`);
  }
}
