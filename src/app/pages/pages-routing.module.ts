import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PagesLayoutComponent } from '../layouts/pages-layout/pages-layout.component';
import { MyAccountsComponent } from './my-accounts/my-accounts.component';
import { TransactionsComponent } from './my-accounts/transactions/transactions.component';
import { MyContactsComponent } from './my-contacts/my-contacts.component';

const routes: Routes = [
  {
    path: 'my-accounts',
    component: PagesLayoutComponent,
    children: [
      { path: '', component: MyAccountsComponent, canActivate: [AuthGuard] },
      {
        path: 'transactions',
        component: TransactionsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'contacts',
    component: PagesLayoutComponent,
    children: [
      { path: '', component: MyContactsComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
