import { Component } from '@angular/core';
import { ShoppingCart } from '../../shared/order/shopping-cart/shopping-cart';
import { ProductsList } from '../../shared/product/products-list/products-list';

@Component({
  selector: 'app-products',
  imports: [ShoppingCart, ProductsList],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {}
