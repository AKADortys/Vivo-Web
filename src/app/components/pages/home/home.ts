import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product';
import { Observable, map } from 'rxjs';
import { Product } from '../../../interfaces/product';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ProductCard } from '../../shared/product/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, CurrencyPipe, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  latestProducts$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.latestProducts$ = this.productService
      .getProducts(1, 4, {})
      .pipe(map((response) => response.data?.products || []));
  }

  ngOnInit() { }
}
