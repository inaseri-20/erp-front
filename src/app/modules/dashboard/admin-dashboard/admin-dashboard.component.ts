import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  userRole = JSON.stringify(localStorage.getItem('group'));

  projects: any[] = [];
  secondTopButtonIcon = 'local_fire_department';
  secondTopButtonTooltip = 'ایجاد دپارتمان جدید';

  constructor(private dashboardService: DashboardService,
              public router: Router) {
  }

  ngOnInit(): void {
    if (this.userRole.includes('middle')) {
      this.secondTopButtonTooltip = 'ایجاد تسک جدید';
      this.secondTopButtonIcon = 'add_task';
    }
    this.getProjects();
  }

  getProjects(): void {
    this.dashboardService.getProjects().subscribe(
      response => {
        this.projects = response;
      }
    );
  }

  secondButtonRoute(): void {
    if (this.userRole.includes('middle')) {
      this.router.navigate(['/task/create']);
    } else {
      this.router.navigate(['/admin/dashboard/department/create']);
    }
  }

  openTasks(data: any, event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['/task'], { queryParams: { projectId: data } });
  }

}
