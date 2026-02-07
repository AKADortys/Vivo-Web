import { Component } from '@angular/core';
import { UsersList } from '../../shared/user/users-list/users-list';
import { ProductsList } from '../../shared/product/products-list/products-list';
import { OrderList } from '../../shared/order/order-list/order-list';
import { OrderStats } from '../../shared/order/order-stats/order-stats.component';
import { UserStatsComponent } from '../../shared/user/user-stats/user-stats.component';

@Component({
  selector: 'app-dashboard-client',
  imports: [UsersList, ProductsList, OrderList, OrderStats, UserStatsComponent],
  templateUrl: './dashboard-client.html',
  styleUrl: './dashboard-client.scss',
})
export class DashboardClient {
  currentView: string = 'users';

  setView(view: string) {
    this.currentView = view;
  }
}
