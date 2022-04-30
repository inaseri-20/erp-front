import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export enum TableSearchMode {
  'NONE',
  'LOCAL',
  'SERVER',
}

interface FormObject {
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges, AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() data!: Array<any>;
  @Input() columns!: Array<any>;

  @Input() selfPagination = false;
  @Input() selfPaginationItemPerPage: Array<number> = [5, 10, 50];
  @Input() selfPaginationPageSize = 10;
  @Input() onlinePaginationLength: any;

  @Output() onlinePaginatorChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchCall: EventEmitter<any>;
  @Output() operationCall: EventEmitter<any>;
  @Output() sort: EventEmitter<any> = new EventEmitter<any>();

  hasSearch = false;

  // Show Data Table
  displayedColumns!: Array<string>;
  searchColumns!: Array<string>;
  dataSource = new MatTableDataSource<any>();
  dataToShow!: Array<any>;
  lastServerSearch!: string;

  showSearchBar = false;

  searchForm!: FormGroup;
  filter: any;

  rowDetail: any;
  clickCoolDown = false;
  clickCount = 0;
  doubleClickAble = true;

  constructor(private fb: FormBuilder,
              private liveAnnouncer: LiveAnnouncer) {
    this.searchCall = new EventEmitter<any>();
    this.operationCall = new EventEmitter<any>();
  }

  ngOnInit(): void {
    if (this.columns) {
      const group: FormObject = {};
      this.columns.forEach((col) => {
        if (col.search) {
          this.hasSearch = true;
          group[col.id] = ['', []];
        }
      });
      this.searchForm = this.fb.group(group);
    }
    // Create Search FormGroup
    const formItems: any = {};
    this.columns.forEach((col, i) => {
      if (col.search) {
        this.hasSearch = true;
        if (col.search.type === 'date_range') {
          formItems[col.id] = this.fb.group({
            fromDate: [],
            toDate: [],
          });
          return;
        }
        formItems[col.id] = [''];
      }
    });
    this.searchForm = this.fb.group(formItems);

  }

  ngAfterViewInit(): void {
    if (this.selfPagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.data || !this.columns) {
      return;
    }

    // Check For Row Detail
    const rowDetailIndex = this.columns.findIndex((col) => col.type === 'rowDetail' || col.id === 'rowDetail');
    if (rowDetailIndex !== -1) {
      this.rowDetail = this.columns[rowDetailIndex];
      this.doubleClickAble = !!this.columns[rowDetailIndex].doubleClickable;
      this.columns.splice(rowDetailIndex, 1);
    }

    this.displayedColumns = [];
    this.displayedColumns = this.displayedColumns.concat(this.columns.map((r) => r.id));

    if (this.hasSearch) {
      this.searchColumns = this.displayedColumns.map((el) => el + '_search');
    }

    this.data.forEach((el) => (el.tableSelect = false));

    this.patchData(this.data);
  }

  patchData(data: Array<any>): void {
    this.dataSource.data = data;
    this.columns.forEach((col) => {
      if (col.search && col.search.type === 'select' && !col.search.options) {
        const options: any = [];
        for (const d of data) {
          if (!options.find((el: any) => el.value === d[col.id])) {
            options.push({name: d[col.id], value: d[col.id]});
          }
        }
        col.search.options = options;
      }
    });

    if (this.hasSearch) {
      this.dataSource.filterPredicate = this.createSearchFilter();

      // Value Changes
      this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe((r) => {
        const localSearchFilter: any = {};
        const serverSearch: any = {};

        Object.keys(r).forEach((id) => {
          const col = this.columns.find((el) => el.id === id);

          if (col.search && col.search.mode === TableSearchMode.LOCAL) {
            const value = r[id];
            const type = col.type;
            localSearchFilter[id] = {value, type};
          }

          if (col.search && col.search.mode === TableSearchMode.SERVER) {
            serverSearch[id] = r[id] !== undefined ? r[id] : '';
          }
        });

        this.dataSource.filter = JSON.stringify(localSearchFilter);

        if (Object.keys(serverSearch).length !== 0 && JSON.stringify(serverSearch) !== this.lastServerSearch) {
          this.lastServerSearch = JSON.stringify(serverSearch);

        }
      });
    }
  }

  createSearchFilter(): any {
    return (data: any, filter: string): boolean => {
      let result = true;
      const filterParsed = JSON.parse(filter);
      for (const key in filterParsed) {
        if (!data[key] || !filterParsed[key]) {
          continue;
        }

        if (
          filterParsed[key].value === '' ||
          filterParsed[key].value === null ||
          filterParsed[key].value === undefined
        ) {
          continue;
        }

        if (filterParsed[key].type === 'date') {
          const searchDate = new Date(filterParsed[key].value).toDateString();
          const dataDate = new Date(data[key]).toDateString();
          result = result && dataDate === searchDate;
        }

        if (filterParsed[key].type === 'string' || filterParsed[key].type === 'price') {
          const dataToSearch = this.numberToEn(data[key]);
          const filterValue = this.numberToEn(filterParsed[key].value);
          result = result && dataToSearch.toString().toLowerCase().indexOf(filterValue) !== -1;
        }

        if (filterParsed[key].type === 'number') {
          const dataToSearch = this.numberToEn(String(data[key]));
          const filterValue = this.numberToEn(String(filterParsed[key].value));
          result = result && dataToSearch === filterValue;
        }
      }
      return result;
    };
  }

  numberToEn(inputStr: string): string {
    return inputStr.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
  }

  doOperation(row: any, operationItem: any): void {
    if (!operationItem.operation) {
      return;
    }

    if (typeof operationItem.operation === 'string') {
      this.operationCall.emit({row, operation: operationItem.operation});
    }

    if (typeof operationItem.operation === 'function') {
      operationItem.operation(row);
    }
  }

  openSaveMenu(): void {
  }

  openSearchBar(): void {
    this.showSearchBar = !this.showSearchBar;
  }

  selectRow(index: number): void {
    if (index < 0 || !this.data || index > this.data.length) {
      return;
    }

    this.data[index].tableSelect = !this.data[index].tableSelect;
  }

  onClick(row: any): void {
    if (!this.rowDetail || !this.rowDetail.click) {
      return;
    }

    if (this.clickCoolDown) {
      this.clickCount++;
      return;
    }

    this.clickCoolDown = true;
    this.clickCount = 1;
    setTimeout(() => {
      this.clickCoolDown = false;

      if (this.clickCount === 1) {
        this.rowDetail.click(row);
      } else {
        this.onDoubleClick(row);
      }

      this.clickCount = 0;
    }, 200);
  }

  onDoubleClick(row: any): void {
    if (!this.rowDetail || !this.rowDetail.doubleClick) {
      return;
    }

    this.rowDetail.doubleClick(row);
  }

  pageChange(event: any): void {
    this.onlinePaginatorChange.emit(event);
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction === 'desc') {
      sortState.active = '-' + sortState.active;
    }
    this.sort.emit(sortState.active);
  }
}
