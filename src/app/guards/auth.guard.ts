import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoginService } from '../auth/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.validateToken().pipe(
      tap((resp) => {
        if (!resp) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
