import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: any;
  @Input() btnIcon!: string;
  @Output() action = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  doAction(): void {
    this.action.emit('');
  }
}
