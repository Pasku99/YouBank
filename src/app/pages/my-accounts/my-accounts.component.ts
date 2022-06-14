import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from 'src/app/auth/login/services/login.service';
import { Account } from './transactions/models/account.model';
import { TransactionService } from './transactions/services/transaction.service';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.scss'],
})
export class MyAccountsComponent implements OnInit {
  accounts: any[] = [];
  faStar: IconDefinition = faStar;

  constructor(
    protected readonly transactionService: TransactionService,
    protected readonly loginService: LoginService,
    protected readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  private async getAccounts(): Promise<void> {
    this.accounts = (
      await firstValueFrom(
        this.transactionService.getAccounts(this.loginService.user?.id ?? ''),
      )
    ).accounts;
  }

  pickAccount(account: Account): void {
    this.router.navigate(['/my-accounts/transactions'], {
      queryParams: { id: account?.id, total: account?.total },
    });
  }
}
