import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PagesLayoutComponent } from '../layouts/pages-layout/pages-layout.component';
import { MyAccountsComponent } from './my-accounts/my-accounts.component';
import { TransactionsComponent } from './my-accounts/transactions/transactions.component';

const routes: Routes = [
  {
    path: 'my-accounts',
    component: PagesLayoutComponent,
    children: [
      { path: '', component: MyAccountsComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'transactions',
    component: PagesLayoutComponent,
    children: [
      { path: '', component: TransactionsComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
