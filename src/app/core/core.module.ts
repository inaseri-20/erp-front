import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutsModule } from './layouts/layouts.module';
import { ApiService } from './services/api/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { PersianNumberPipe } from './pipes/persian-number.pipe';
import { PersianDatePipe } from './pipes/persian-date.pipe';


@NgModule({
  declarations: [
    PersianNumberPipe,
    PersianDatePipe
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    MatDialogModule
  ],
  exports: [
    PersianDatePipe,
    PersianNumberPipe
  ],
  providers: [
    MatSnackBar,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ]
})
export class CoreModule {
}
