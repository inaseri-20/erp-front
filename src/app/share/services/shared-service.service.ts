import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private apiService: ApiService) {
  }

  getFeatures(): Observable<any> {
    return this.apiService.get(`${environment.apiUrl}notification/features`);
  }
}
