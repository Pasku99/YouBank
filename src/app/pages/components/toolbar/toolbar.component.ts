import { Component, OnInit } from '@angular/core'
import { MenuItem } from './models/toolbar.model'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'About',
      icon: 'help',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Pricing',
      icon: 'attach_money',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Docs',
      icon: 'notes',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Showcase',
      icon: 'slideshow',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Blog',
      icon: 'rss_feed',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
    {
      label: 'Sign Up',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    }
  ]

  orders = [{ asd: 'a', fff: 'juan' }]

  ordersTableColumns = [
    { name: 'as', dataKey: 'asd', position: 'right', isSortable: true },
    { name: 'asd', dataKey: 'fff', position: 'right', isSortable: true }
  ]
  tableColumns = [
    { name: 'as', dataKey: 'asd', position: 'right', isSortable: true }
  ]

  constructor() {}

  ngOnInit(): void {}

  sortData(event: any): void {
    console.log(event)
  }

  removeOrder(event: any): void {
    console.log(event)
  }
}
