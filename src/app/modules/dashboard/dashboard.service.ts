import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core/services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  projectBaseApi = `${environment.apiUrl}task/`;
  clientBaseApi = `${environment.apiUrl}auth/client/`;
  departmentBaseApi = `${environment.apiUrl}department/`;

  constructor(private apiService: ApiService) {
  }

  getProjects(): Observable<any> {
    return this.apiService.get(`${this.projectBaseApi}project/`);
  }

  getProject(projectId: any): Observable<any> {
    return this.apiService.get(`${this.projectBaseApi}project/${projectId}/`);
  }

  createProject(data: any): Observable<any> {
    return this.apiService.post(`${this.projectBaseApi}project/`, null, null, data);
  }

  deleteProject(projectId: any): Observable<any> {
    return this.apiService.delete(`${this.projectBaseApi}project/${projectId}/`);
  }

  updateProject(data: any, projectId: any): Observable<any> {
    return this.apiService.put(`${this.projectBaseApi}project/${projectId}/`, null, null, data);
  }

  getStatues(): Observable<any> {
    return this.apiService.get(`${this.projectBaseApi}status`);
  }

  getClients(): Observable<any> {
    return this.apiService.get(this.clientBaseApi);
  }

  getDepartments(): Observable<any> {
    return this.apiService.get(this.departmentBaseApi);
  }

  creatDepartment(data: any): Observable<any> {
    return this.apiService.post(this.departmentBaseApi, null, null, data);
  }
}