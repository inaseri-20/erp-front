import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AssistantGuard implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (JSON.stringify(localStorage.getItem('group')).includes('middle')) {
      return true;
    } else {
      this.alertService.messageError('شما برای مشاهده این قسمت دسترسی ندارید');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }


}
