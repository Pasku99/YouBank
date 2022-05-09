import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { NoauthGuard } from '../guards/noauth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent,
    canActivate: [NoauthGuard],
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: 'register',
    component: AuthLayoutComponent,
    canActivate: [NoauthGuard],
    children: [{ path: '', component: RegisterComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
