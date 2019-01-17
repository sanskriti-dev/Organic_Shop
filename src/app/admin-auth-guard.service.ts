import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor( private auth: AuthService) { }
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.map(appUser => appUser.isAdmin);
  }
}
