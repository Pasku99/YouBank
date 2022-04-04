import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesLayoutComponent } from '../layouts/pages-layout/pages-layout.component';
import { MyAccountsComponent } from './my-accounts/my-accounts.component';
import { TransactionsComponent } from './my-accounts/transactions/transactions.component';

const routes: Routes = [
  {
    path: 'my-accounts',
    component: PagesLayoutComponent,
    canActivate: [],
    children: [{ path: '', component: MyAccountsComponent }]
  },
  {
    path: 'transactions',
    component: PagesLayoutComponent,
    canActivate: [],
    children: [{ path: '', component: TransactionsComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
