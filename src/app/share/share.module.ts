import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersianDatePickerModule } from './components/persian-date-picker/persian-date-picker.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CustomMatPaginatorIntlService } from './components/paginator/custom-mat-paginator-intl.service';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { AddToHomeScreenComponent } from './components/add-to-home-screen/add-to-home-screen.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { LineEChartsComponent } from './components/line-echarts/line-echarts.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NoDataComponent } from './components/no-data/no-data.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableSaveCSVComponent } from './components/table/table-save-csv/table-save-csv.component';
import { TableComponent } from './components/table/table.component';
import { TableSaveXLSComponent } from './components/table/table-save-xls/table-save-xls.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ConvertDatePipe } from './components/persian-date-picker/convert-date.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '../core/interceptor/api.interceptor';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS
} from './components/persian-date-picker/persian-date-picker.adapter';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';


@NgModule({
  declarations: [
    SplashScreenComponent,
    AddToHomeScreenComponent,
    LineEChartsComponent,
    NoDataComponent,
    PageHeaderComponent,
    TableSaveCSVComponent,
    TableComponent,
    TableSaveXLSComponent,
    DateTimePickerComponent
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PersianDatePickerModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatMenuModule,
    MatSliderModule,
    NgxEchartsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    SplashScreenComponent,
    LineEChartsComponent,
    NoDataComponent,
    PageHeaderComponent,
    TableSaveCSVComponent,
    TableComponent,
    TableSaveXLSComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService },
    ConvertDatePipe,
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService }
  ]
})
export class ShareModule {
}
