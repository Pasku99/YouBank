import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PagesLayoutComponent } from '../layouts/pages-layout/pages-layout.component'
import { MyAccountsComponent } from './my-accounts/my-accounts.component'

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesLayoutComponent,
    canActivate: [],
    children: [{ path: '', component: MyAccountsComponent }]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
