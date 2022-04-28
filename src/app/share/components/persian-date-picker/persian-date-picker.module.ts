import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PersianDatePickerComponent } from './persian-date-picker.component';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { ConvertDatePipe } from './convert-date.pipe';
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS
} from './persian-date-picker.adapter';

@NgModule({
  declarations: [PersianDatePickerComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [PersianDatePickerComponent],
  providers: [
    ConvertDatePipe,
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: PERSIAN_DATE_FORMATS
    }
  ]
})
export class PersianDatePickerModule {
}
