import { Component } from '@angular/core';
import { ShoppingCart } from '../../shared/order/shopping-cart/shopping-cart';

@Component({
  selector: 'app-order-form',
  imports: [ShoppingCart],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
})
export class OrderForm {}
