import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  dayChange: Subject<any> = new Subject<any>();

  dayTitleChange: Subject<any> = new Subject<any>();

  constructor() {
  }
}
