import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersianDatePickerModule } from './components/persian-date-picker/persian-date-picker.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl } from '@angular/material/paginator';
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


@NgModule({
  declarations: [
    SplashScreenComponent,
    AddToHomeScreenComponent,
    LineEChartsComponent,
    NoDataComponent,
    PageHeaderComponent
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
    MatTooltipModule
  ],
  exports: [
    SplashScreenComponent,
    LineEChartsComponent,
    NoDataComponent,
    PageHeaderComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService }
  ]
})
export class ShareModule {
}
