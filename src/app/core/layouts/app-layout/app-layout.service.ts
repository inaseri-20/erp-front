import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLayoutService {

  notificationPath = `${environment.apiUrl}notification`;

  constructor(private apiService: ApiService) {
  }

  getNotifications(): Observable<any> {
    return this.apiService.get(this.notificationPath);
  }
}
