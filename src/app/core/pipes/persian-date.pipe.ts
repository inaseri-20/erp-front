import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return new Date(value).toLocaleDateString('fa-IR', { year: 'numeric', month: 'numeric', day: 'numeric' });
  }

}
