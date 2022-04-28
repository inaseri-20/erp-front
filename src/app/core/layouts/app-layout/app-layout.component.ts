import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../services/client/client.service';
import { AppLayoutService } from './app-layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit, OnChanges {

  sideExpand = true;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  navMode: MatDrawerMode = 'side';

  clientInfo: any;
  hearts: any;
  notifications: any;
  currentDay: any;
  dayTitle: any;

  constructor(private dialog: MatDialog,
              private clientService: ClientService,
              private appLayoutService: AppLayoutService,
              public router: Router) {
    this.updateNavStatus(window.innerWidth);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.sideExpand = false;
    }
    this.clientInfo = localStorage.getItem('pezeshkitoClientInfo');
    this.clientInfo = JSON.parse(this.clientInfo);
    this.currentDay = this.clientInfo.day;
    this.hearts = this.clientInfo.joon;
    this.getNotifications();
    this.clientService.dayChange.subscribe(result => {
      if (result) {
        this.currentDay = result;
      }
    });

    this.clientService.dayTitleChange.subscribe(
      result => {
        setTimeout(() => {
          this.dayTitle = result;
        }, 1000);
      }
    );
  }

  toggleMenu(): void {
    this.sideExpand = !this.sideExpand;
    this.sidenav.toggle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateNavStatus(event.target.innerWidth);
  }

  updateNavStatus(pageWidth: number): void {
    this.navMode = 'side';
  }

  logout(): void {
    window.location.reload();
    localStorage.clear();
    sessionStorage.clear();
  }

  nextDay(): void {
    if (this.currentDay < 100) {
      if (Number(this.clientInfo.day) > this.currentDay) {
        this.currentDay += 1;
        this.clientService.dayChange.next(this.currentDay);
      }
    }
  }

  backDay(): void {
    this.currentDay -= 1;
    this.clientService.dayChange.next(this.currentDay);
  }

  openDialog(): void {
  }

  getNotifications(): void {
    this.appLayoutService.getNotifications().subscribe(
      response => {
        response.forEach((el: any) => {
          el.created = new Date(el.created).toLocaleDateString('fa-IR', {
            year: 'numeric',
            day: 'numeric',
            month: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          });
        });
        this.notifications = response;
      }
    );
  }

  changeInformation(): void {
  }
}
