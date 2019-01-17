import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {ActivateRoutes} from '@angular/router/src/operators/activate_routes';
import {ActivatedRoute} from '@angular/router';
import {AppUser} from './models/app-user';
import {AdminAuthGuardService} from './admin-auth-guard.service';
import {UserService} from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/Observable/of';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor( private userSerice: UserService,private afauth: AngularFireAuth , private route: ActivatedRoute) {
    this.user$ = afauth.authState;
  }
  login() {
     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
     localStorage.setItem('returnUrl',returnUrl);
    this.afauth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afauth.auth.signOut();
  }
  get appUser$(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if (user) return this.userSerice.get(user.uid);

      return Observable.of(null);
    });
  }
}
