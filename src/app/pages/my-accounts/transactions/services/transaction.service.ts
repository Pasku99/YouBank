import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction.model';

const base_url = environment.base_url;
const version = environment.version;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient, private readonly router: Router) {}

  transaction(transaction: Transaction): Observable<any> {
    return this.http.post(
      `${base_url}/users/transaction`,
      transaction,
      this.headers,
    );
  }

  getAccounts(id: string): Observable<any> {
    return this.http.get(`${base_url}/users/accounts?id=${id}`, this.headers);
  }

  getTransactions(id: string, accountId: string): Observable<any> {
    return this.http.get(
      `${base_url}/users/accounts/transactions?id=${id}&accountId=${accountId}`,
      this.headers,
    );
  }

  get headers(): any {
    return {
      headers: {
        'x-token': localStorage.getItem('x-token') || '',
      },
    };
  }
}
