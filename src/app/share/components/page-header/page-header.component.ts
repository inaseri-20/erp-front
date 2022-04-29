import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() pageTitle: any;

  @Input() firstButtonIcon: any;
  @Input() firstButtonTooltip: any;

  @Input() secondButtonIcon: any;
  @Input() secondButtonTooltip: any;

  @Output() firstButtonAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() secondButtonAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
