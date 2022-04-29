import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  projects: any[] = [];

  constructor(private adminDashboardService: AdminDashboardService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.adminDashboardService.getProjects().subscribe(
      response => {
        this.projects = response;
      }
    );
  }

}
