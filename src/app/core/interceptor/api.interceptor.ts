import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  private hasError = false;

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.totalRequests++;

    if (localStorage.getItem('erpAccessToken')) {
      const token = localStorage.getItem('erpAccessToken');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }


    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
        }
      }), catchError(err1 => this.handleError(err1))
    );
  }

  handleError(error: any): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `${error?.error?.msg}`;
    } else {
      errorMessage = ` ${error?.error?.msg}`;
    }
    return throwError(errorMessage);
  }

}
