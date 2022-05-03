import { Component, OnInit } from '@angular/core';
import { TableSearchMode } from '../../../share/components/table/table.component';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { CleanObjectService } from '../../../core/services/api/clean-object.service';

interface ClientFilters {
  username?: string;
  cellphone?: boolean;
}


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  data: any;
  columns = [
    {
      name: 'نام',
      id: 'first_name',
      type: 'string',
      minWidth: '150px',
      headerAlign: 'center',
      dataAlign: 'center',
      search: {
        type: 'text',
        mode: TableSearchMode.LOCAL
      }
    },
    {
      name: 'نام خانوادگی',
      id: 'last_name',
      type: 'string',
      minWidth: '150px',
      headerAlign: 'center',
      dataAlign: 'center',
      search: {
        type: 'text',
        mode: TableSearchMode.LOCAL
      }
    },
    {
      name: 'شماره موبایل',
      id: 'cellphone',
      type: 'string',
      minWidth: '150px',
      headerAlign: 'center',
      dataAlign: 'center',
      search: {
        type: 'text',
        mode: TableSearchMode.LOCAL
      }
    },
    {
      name: 'نام کاربری',
      id: 'username',
      type: 'string',
      minWidth: '150px',
      headerAlign: 'center',
      dataAlign: 'center',
      search: {
        type: 'text',
        mode: TableSearchMode.LOCAL
      }
    },
    {
      name: 'عملیات',
      id: 'operation',
      type: 'operation',
      minWidth: '130px',
      headerAlign: 'center',
      dataAlign: 'center',
      sticky: true,
      operations: [
        {
          name: 'مشاهده داشبورد',
          icon: 'remove_red_eye',
          color: 'primary',
          operation: (row: any) => {
            this.router.navigate(['/task'], { queryParams: { userId: row.id } });
          }
        }
      ]
    }
  ];

  filter!: ClientFilters;

  constructor(private dashboardService: DashboardService,
              private cleanService: CleanObjectService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.dashboardService.getClients(this.filter).subscribe(
      response => {
        this.data = response;
      }
    );
  }

  doSearch(event: any): void {
    this.filter = this.cleanService.clean(event);
    this.getClients();
  }
}
