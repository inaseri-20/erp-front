import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {AlertService} from '../services/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let expDate: any;
    if (localStorage.getItem('erpAccessToken')) {
      expDate = jwt_decode(JSON.stringify(localStorage.getItem('erpAccessToken')));
      const unixTimestamp = expDate.exp;
      expDate = new Date(unixTimestamp * 1000);
    } else {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (!localStorage.getItem('erpAccessToken')) {
      localStorage.clear();
      this.alertService.messageError('نشست شما تایید نشد. لطفا وارد شوید', 'باشه');
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (expDate && new Date(expDate) < new Date()) {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
      this.alertService.messageError('نشست شما منقضی شده است. لطفا وارد شوید.', 'باشه');
      return false;
    }

    return true;

  }

}
