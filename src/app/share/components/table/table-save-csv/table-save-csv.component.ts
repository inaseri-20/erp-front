import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-table-save-csv',
    template: ` <button mat-menu-item (click)="save()">Save As CSV</button> `,
})
export class TableSaveCSVComponent implements OnInit {
    @Input() name = 'table';
    @Input() data!: Array<any>;
    @Input() columns!: Array<any>;

    constructor() {}

    ngOnInit(): void {}

    save(): void {
        if (!this.data || !this.columns) {
            return;
        }

        const replacer = (key: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here
        const header = this.columns.map((r) => r.name);
        const csv = this.data.map((row) =>
            this.columns
                .map((col) =>
                    col.id !== 'operation'
                        ? JSON.stringify(col.convert ? col.convert(row[col.id]) : row[col.id], replacer)
                        : null
                )
                .join(',')
        );
        csv.unshift(header.join(','));
        const csvArray = csv.join('\r\n');

        const a = document.createElement('a');
        const blob = new Blob([csvArray], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = `${this.name}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
