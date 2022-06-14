import { Component, OnInit } from '@angular/core';
import { catchError, firstValueFrom, take, throwError } from 'rxjs';
import { LoginService } from 'src/app/auth/login/services/login.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { TableColumn } from '../components/table/models/table.model';
import { TransactionService } from '../my-accounts/transactions/services/transaction.service';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.scss'],
})
export class MyContactsComponent implements OnInit {
  ordersTableColumns: TableColumn[] = [
    { name: 'Nombre', dataKey: 'name', position: 'right', isSortable: true },
  ];
  users: User[] = [];

  constructor(
    private readonly transactionService: TransactionService,
    private readonly loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  sortData(event: any): void {
    console.log(event);
  }

  private async getUsers(): Promise<void> {
    this.users = (await firstValueFrom(this.loginService.getUsers())).users;
  }

  sendMoney(user: User) {
    console.log(user);
    Swal.fire({
      title: 'Enviar dinero',
      html: `<input type="number" id="amount" class="swal2-input" placeholder="Cantidad (€)">`,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const amount = (
          Swal.getPopup()?.querySelector('#amount') as HTMLInputElement
        )?.value;
        if (!amount) {
          Swal.showValidationMessage(`Por favor, introduzca una cantidad`);
        } else if (parseFloat(amount) > 1000) {
          Swal.showValidationMessage(`La cantidad ha de ser menor a 1000€`);
        }
        return { amount: amount };
      },
    }).then((amount) => {
      if (amount.value) {
        Swal.fire({
          title: 'Introduzca la contraseña',
          html: `<input type="password" id="password" class="swal2-input" placeholder="Introduzca la contraseña">`,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          focusConfirm: false,
          preConfirm: async () => {
            const password = (
              Swal.getPopup()?.querySelector('#password') as HTMLInputElement
            )?.value;
            if (
              !password ||
              !(
                await firstValueFrom(
                  this.loginService.checkPassword({
                    TIN: this.loginService.user.TIN,
                    email: this.loginService.user.email,
                    password: password,
                  }),
                )
              )?.ok
            ) {
              Swal.showValidationMessage(
                `Contraseña incorrecta. Por favor, vuelva a intentarlo.`,
              );
            }
            return { password: password };
          },
        }).then((password) => {
          if (password.value) {
            this.transaction(
              parseFloat(amount.value?.amount!),
              password.value.password,
              user,
            );
          }
        });
      }
    });
  }

  private transaction(amount: number, password: string, user: User) {
    this.transactionService
      .transaction({
        TIN: this.loginService.user.TIN,
        email: this.loginService.user.email,
        amount: amount,
        password: password,
        destinationTIN: user.TIN,
        destinationEmail: user.email,
      })
      .pipe(
        take(1),
        catchError((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error en la transacción',
            text: err.error.message,
          });
          return throwError(() => new Error(err));
        }),
      )
      .subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: res.msg,
          text: '',
        });
      });
  }
}
