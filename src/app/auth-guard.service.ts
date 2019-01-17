import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, private route: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.user$.map(user => {
      if (user) return true;
      this.route.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    });
  }
}

