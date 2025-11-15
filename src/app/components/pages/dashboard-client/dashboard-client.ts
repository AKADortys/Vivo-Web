import { Component } from '@angular/core';
import { UsersList } from '../../shared/user/users-list/users-list';
import { ProductsList } from '../../shared/product/products-list/products-list';

@Component({
  selector: 'app-dashboard-client',
  imports: [UsersList, ProductsList],
  templateUrl: './dashboard-client.html',
  styleUrl: './dashboard-client.scss',
})
export class DashboardClient {}
