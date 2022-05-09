import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, take, throwError } from 'rxjs';
import { FormBase } from 'src/app/utils/form-controls/form.base';
import Swal from 'sweetalert2';
import { UserRegister } from './models/register.model';
import { RegisterService } from './services/register.service';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent
  extends FormBase<UserRegister>
  implements OnInit
{
  faSpinner: IconDefinition = faSpinner;
  waiting = false;

  constructor(
    protected readonly fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
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
      name: [null, Validators.required],
      firstSurname: [null, Validators.required],
      secondSurname: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      rol: [null, Validators.required]
    });
  }

  protected setForm(): void {
    this.form.patchValue({
      name: null,
      firstSurname: null,
      secondSurname: null,
      email: null,
      password: null,
      confirmPassword: null,
      rol: 'USER'
    });
  }

  register(): void {
    this.waiting = true;
    if (this.form.valid) {
      const user = this.formatUser(this.form.value);
      this.registerService
        .register(user)
        .pipe(
          take(1),
          catchError((err) => {
            Swal.fire({
              icon: 'error',
              title: this.translateService.instant('oops'),
              text: err.error.message
            });
            this.waiting = false;
            return throwError(() => new Error(err));
          })
        )
        .subscribe(() => {
          localStorage.setItem('email', this.form?.get('email')?.value);
          this.router.navigateByUrl('login');
          this.waiting = false;
        });
    }
  }

  private formatUser(user: UserRegister): UserRegister {
    return {
      name: user?.name,
      firstSurname: user?.firstSurname,
      secondSurname: user?.secondSurname,
      email: user?.email,
      password: user?.password ?? '',
      confirmPassword: user?.password ?? '',
      rol: 'USER'
    };
  }
}
