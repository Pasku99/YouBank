import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login/services/login.service';
import { MenuItem } from './models/toolbar.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Mis cuentas',
      icon: 'attach_money',
      link: '/my-accounts',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },

    {
      label: 'Cerrar Sesión',
      icon: 'logout',
      link: '/login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    }
  ];

  constructor(private readonly loginService: LoginService) {}

  ngOnInit(): void {}

  sortData(event: any): void {
    console.log(event);
  }

  removeOrder(event: any): void {
    console.log(event);
  }

  logout(item: MenuItem) {
    if (item?.link === '/login' && item?.icon === 'logout') {
      this.loginService.logout();
    }
  }
}
