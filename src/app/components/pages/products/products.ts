import { Component } from '@angular/core';
import { ProductsList } from '../../shared/product/products-list/products-list';

@Component({
  selector: 'app-products',
  imports: [ProductsList],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {}
