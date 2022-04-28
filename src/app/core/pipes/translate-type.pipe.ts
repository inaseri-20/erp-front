import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateType'
})
export class TranslateTypePipe implements PipeTransform {

  transform(value: string): string {
    let translated = '';
    if (value === 'Achievement') {
      translated = 'مدال';
    }
    if (value === 'bugReporter') {
      translated = 'گزارش خطا';
    }
    if (value === 'Achievement') {
      translated = 'مدال';
    }
    if (value === 'comment') {
      translated = 'کامنت';
    }
    if (value === 'dayOff') {
      translated = 'مرخصی';
    }
    if (value === 'dayOff_added') {
      translated = 'اضافه شدن مرخصی';
    }
    if (value === 'deleted') {
      translated = 'حذف';
    }
    if (value === 'emergency_dayoff') {
      translated = 'مرخصی اضطراری';
    }
    if (value === 'joon') {
      translated = 'جون';
    }
    if (value === 'like') {
      translated = 'جون';
    }
    if (value === 'open_day') {
      translated = 'باز شدن روز';
    }
    if (value === 'pendingForaccepted') {
      translated = 'درحال تایید';
    }
    if (value === 'score') {
      translated = 'امتیاز';
    }
    if (value === 'Emergency') {
      translated = 'مرخصی اضطراری';
    }
    if (value === 'Pending') {
      translated = 'در حال بررسی';
    }
    if (value === 'Accepted') {
      translated = 'تایید شده';
    }
    return translated;
  }

}
