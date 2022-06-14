import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '../angular-material.module';
import { PagesLayoutComponent } from '../layouts/pages-layout/pages-layout.component';
import { DataPropertyGetterPipe } from '../utils/pipes/data-property-getter.pipe';
import { TableComponent } from './components/table/table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MyAccountsComponent } from './my-accounts/my-accounts.component';
import { TransactionsComponent } from './my-accounts/transactions/transactions.component';
import { MyContactsComponent } from './my-contacts/my-contacts.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    PagesLayoutComponent,
    MyAccountsComponent,
    TransactionsComponent,
    MyContactsComponent,
    DataPropertyGetterPipe,
    TableComponent
  ],
  exports: [
    ToolbarComponent,
    PagesLayoutComponent,
    DataPropertyGetterPipe,
    MyAccountsComponent,
    TransactionsComponent,
    MyContactsComponent,
    TableComponent
  ],
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
export class PagesModule {}
