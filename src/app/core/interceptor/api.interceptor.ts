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

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

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
      }), catchError(err => this.handleError(err))
    );
  }

  handleError(error: any): any {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error?.error;
    } else {
      console.log(error.error.msg);
      errorMessage = error.error.msg;
    }

    return throwError(errorMessage);
  }

}
