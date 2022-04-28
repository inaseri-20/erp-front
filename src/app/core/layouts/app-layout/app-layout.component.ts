import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private dialog: MatDialog,
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
}
