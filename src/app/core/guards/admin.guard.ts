import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert/alert.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (JSON.stringify(localStorage.getItem('group')).includes('admin')) {
      return true;
    } else if (JSON.stringify(localStorage.getItem('group')).includes('middle')) {
      return true;
    } else if (JSON.stringify(localStorage.getItem('group')).includes('client')) {
      this.router.navigate(['/task']);
      return false;
    }
    return false;

  }

}
