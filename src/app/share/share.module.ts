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
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService }
  ]
})
export class ShareModule {
}
