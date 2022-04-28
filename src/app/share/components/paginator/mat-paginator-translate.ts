import { MatPaginatorIntl } from '@angular/material/paginator';

const faRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 از ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} از ${length}`;
};

export function getFaPaginatorIntl(): any {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'گزارش در صفحه:';
  paginatorIntl.nextPageLabel = 'بعدی';
  paginatorIntl.previousPageLabel = 'قبلی';
  paginatorIntl.getRangeLabel = faRangeLabel;

  return paginatorIntl;
}

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'تعداد در هر صفحه‌:';
  customPaginatorIntl.firstPageLabel = 'نخستین صفحه';
  customPaginatorIntl.lastPageLabel = 'آخرین صفحه‌';
  customPaginatorIntl.nextPageLabel = 'صفحه‌ی بعدی';
  customPaginatorIntl.previousPageLabel = 'صفحه‌ی پیشین';

  return customPaginatorIntl;
}
