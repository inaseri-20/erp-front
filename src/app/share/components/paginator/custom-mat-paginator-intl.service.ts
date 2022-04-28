import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntlService extends MatPaginatorIntl {

  constructor() {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations(): void {
    this.itemsPerPageLabel = 'تعداد سطر در هر صفحه :';
    this.nextPageLabel = 'صفحه‌ی بعد';
    this.previousPageLabel = 'صفحه قبل';
    this.lastPageLabel = 'صفحه آخر';
    this.firstPageLabel = 'صفحه اول';
    this.changes.next();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} تا ${endIndex} از ${length}`;
  };


}
