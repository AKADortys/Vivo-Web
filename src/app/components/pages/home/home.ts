import { Component } from '@angular/core';
import { OrderHistory } from '../../shared/order/order-history/order-history';
@Component({
  selector: 'app-home',
  imports: [OrderHistory],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
