import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '../angular-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthLayoutComponent],
  exports: [LoginComponent, RegisterComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    AngularMaterialModule,
    FontAwesomeModule
  ]
})
export class AuthModule {}
