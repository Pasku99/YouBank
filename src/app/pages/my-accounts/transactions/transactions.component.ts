import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { LoginService } from 'src/app/auth/login/services/login.service';
import { TableColumn } from '../../components/table/models/table.model';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  ordersTableColumns: TableColumn[] = [
    { name: 'Motivo', dataKey: 'reason', position: 'right', isSortable: true },
    {
      name: 'Cantidad',
      dataKey: 'amount',
      position: 'right',
      isSortable: true,
    },
    { name: 'Fecha', dataKey: 'date', position: 'right', isSortable: true },
    {
      name: 'Número de cuenta',
      dataKey: 'name',
      position: 'right',
      isSortable: true,
    },
  ];
  total: number = 0;

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly transactionService: TransactionService,
    protected readonly loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.getTransactions(params['id']);
      this.total = params['total'];
    });
  }

  async getTransactions(accountId: string): Promise<void> {
    this.transactions = (
      await firstValueFrom(
        this.transactionService.getTransactions(
          this.loginService.user.id ?? '',
          accountId,
        ),
      )
    ).transactions;
  }

  sortData(event: any): void {
    console.log(event);
  }

  removeOrder(event: any) {
    console.log(event);
  }
}
