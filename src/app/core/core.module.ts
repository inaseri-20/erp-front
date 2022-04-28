import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutsModule } from './layouts/layouts.module';
import { ApiService } from './services/api/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateTypePipe } from './pipes/translate-type.pipe';
import { PersianNumberPipe } from './pipes/persian-number.pipe';


@NgModule({
  declarations: [
    TranslateTypePipe,
    PersianNumberPipe
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    MatDialogModule
  ],
  exports: [
    TranslateTypePipe,
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
