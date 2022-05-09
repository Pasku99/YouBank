import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginService } from '../auth/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.validateNoToken().pipe(
      tap((resp) => {
        if (!resp) {
          this.router.navigateByUrl('/my-accounts');
        }
      })
    );
  }
}
