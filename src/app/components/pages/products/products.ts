import { Component } from '@angular/core';
import { ShoppingCart } from '../../shared/order/shopping-cart/shopping-cart';

@Component({
  selector: 'app-products',
  imports: [ShoppingCart],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {}
