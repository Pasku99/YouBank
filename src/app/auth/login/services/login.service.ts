import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, take, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/login.model';

const base_url = environment.base_url;
const version = environment.version;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User = {} as User;

  constructor(private http: HttpClient) {}

  login(user: UserLogin): Observable<any> {
    return this.http.post(`${base_url}/login`, user);
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${base_url}/login/token`, this.headers);
  }

  validate(correct: boolean, incorrect: boolean): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return of(incorrect);
    }
    return this.isAuthenticated().pipe(
      take(1),
      tap((res) => {
        this.user = res.user;
        localStorage.setItem('x-token', res.token);
      }),
      map(() => {
        return correct;
      }),
      catchError(() => {
        localStorage.removeItem('token');
        return of(incorrect);
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.validate(true, false);
  }

  validateNoToken(): Observable<boolean> {
    return this.validate(false, true);
  }

  get headers(): any {
    return {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    };
  }
}
