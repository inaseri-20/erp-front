import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authBaseUrl = `${environment.apiUrl}auth/`;

  constructor(private apiService: ApiService) {
  }

  loginUser(verifyData: any): Observable<any> {
    return this.apiService.post(`${this.authBaseUrl}verify/`, null, null, verifyData);
  }

  verify(verifyData: any): Observable<any> {
    return this.apiService.post(`${this.authBaseUrl}login/${verifyData.username}/`, null, null, verifyData);
  }
}
