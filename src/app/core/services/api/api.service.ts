import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  httpOptions!: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


  get(path: string, headers?: any, queryParams?: any): Observable<any> {
    return this.http.get(path, {headers: headers || this.httpOptions, params: queryParams}).pipe(
      retry(0),
    );
  }

  post(path: string, headers?: any, queryParams?: any, body?: any): Observable<any> {
    return this.http.post(path, body, {headers: headers || this.httpOptions, params: queryParams}).pipe(
      retry(0),
    );
  }

  put(path: string, headers?: any, queryParams?: any, body?: any): Observable<any> {
    return this.http.put(path, body, {headers: headers || this.httpOptions, params: queryParams}).pipe(
      retry(0),
    );
  }

  delete(path: string, headers?: any, queryParams?: any): Observable<any> {
    return this.http.delete(path, {headers: headers || this.httpOptions, params: queryParams}).pipe(
      retry(0),
    );
  }


}
