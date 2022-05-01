import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value) {
      return new Date(value).toLocaleDateString('fa-IR', { year: 'numeric', month: 'numeric', day: 'numeric' });
    } else {
      return "تاریخ ثبت نشده است"
    }
  }

}
