import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { catchError, take, throwError } from 'rxjs';
import { FormBase } from 'src/app/utils/form-controls/form.base';
import Swal from 'sweetalert2';
import { UserLogin } from './models/login.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBase<UserLogin> implements OnInit {
  faSpinner: IconDefinition = faSpinner;
  waiting = false;

  constructor(
    protected readonly fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private readonly translateService: TranslateService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.initForm();
    this.setForm();
  }

  protected initForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rememberMe: [null]
    });
  }

  protected setForm(): void {
    this.form.patchValue({
      email: localStorage.getItem('email') || null,
      password: null,
      rememberMe: localStorage.getItem('email') ? true : false
    });
  }

  login(): void {
    this.waiting = true;
    if (this.form.valid) {
      this.checkRemember();
      const user: UserLogin = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      };
      this.loginService
        .login(user)
        .pipe(
          take(1),
          catchError((err) => {
            Swal.fire({
              icon: 'error',
              title: this.translateService.instant('oops'),
              text: err.error.message
            });
            this.form.get('password')?.reset();
            this.waiting = false;
            return throwError(() => new Error(err));
          })
        )
        .subscribe((res) => {
          this.router.navigateByUrl('/my-accounts');
          this.waiting = false;
        });
    }
  }

  private checkRemember(): void {
    if (this.form.get('rememberMe')?.value) {
      localStorage.setItem('email', this.form.get('email')?.value);
    } else {
      localStorage.removeItem('email');
    }
  }
}
