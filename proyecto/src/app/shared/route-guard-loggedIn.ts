import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class RouteGuardLoggedIn implements CanActivate {
  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      // Revise en firebase si el usuario cambio su estado de autenticacion
      // paso de logout a logged in o inverso
      this.firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          this.router.navigateByUrl("home");
          resolve(false);

        } else {
          resolve(true);
        }
      });
    });
  }
}
