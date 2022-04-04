import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../components/table/models/table.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  orders = [
    {
      account: 'Compra a Burguer King',
      amount: '-10.25€',
      total: '4142.85€',
      date: '04/04/2022'
    },
    {
      account: 'Nómina UA marzo',
      amount: '+2300.87€',
      total: '4153.1€',
      date: '04/04/2022'
    },
    {
      account: 'Compra Amazon',
      amount: '-65.57€',
      total: '1852.23€',
      date: '04/04/2022'
    },
    {
      account: 'Compra Repsol',
      amount: '-82.20€',
      total: '1917.8€',
      date: '04/04/2022'
    }
  ];
  ordersTableColumns: TableColumn[] = [
    { name: 'Motivo', dataKey: 'account', position: 'right', isSortable: true },
    {
      name: 'Cantidad',
      dataKey: 'amount',
      position: 'right',
      isSortable: true
    },
    { name: 'Fecha', dataKey: 'date', position: 'right', isSortable: true },
    { name: 'Total', dataKey: 'total', position: 'right', isSortable: true }
  ];

  constructor() {}

  ngOnInit(): void {}

  sortData(event: any): void {
    console.log(event);
  }

  removeOrder(event: any) {
    console.log(event);
  }
}
