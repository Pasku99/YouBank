import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthRoutingModule } from './auth/auth-routing.module'

export const routes: Routes = [{ path: '**', redirectTo: 'login' }]

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
