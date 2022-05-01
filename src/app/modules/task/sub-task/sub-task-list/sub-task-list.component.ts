import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-task-list',
  templateUrl: './sub-task-list.component.html',
  styleUrls: ['./sub-task-list.component.scss']
})
export class SubTaskListComponent implements OnInit {

  taskId = this.activatedRoute.snapshot.params['taskId'];

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
