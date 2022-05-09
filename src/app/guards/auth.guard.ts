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
        } else if (!this.loginService.user?.isVerified) {
          Swal.fire({
            title: '¡Error de verificación!',
            text: 'El usuario no se encuentra verificado. Verifique su email antes de iniciar sesión',
            icon: 'error',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              localStorage.removeItem('token');
              this.router.navigateByUrl('/login');
            }
          });
        } else if (resp) {
          this.router.navigateByUrl('/my-accounts');
        }
      })
    );
  }
}
