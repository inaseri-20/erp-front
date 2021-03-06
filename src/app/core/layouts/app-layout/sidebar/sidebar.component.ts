import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() closeNav: EventEmitter<any>;

  constructor() {
    this.closeNav = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }
}
