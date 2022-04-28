import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() closeNav: EventEmitter<any>;

  clientSetting: any;
  clientInfo: any;

  constructor() {
    this.closeNav = new EventEmitter<any>();
  }

  ngOnInit(): void {
    const token: any = localStorage.getItem('erpAccessToken');
    this.clientInfo = localStorage.getItem('pezeshkitoClientInfo');
    this.clientInfo = JSON.parse(this.clientInfo);
    this.clientInfo.jti = token;
    this.clientSetting = localStorage.getItem('pezeshkitoClientSetting');
    this.clientSetting = JSON.parse(this.clientSetting);
  }

  logout(): void {
    window.location.reload();
    localStorage.clear();
    sessionStorage.clear();
  }
}
