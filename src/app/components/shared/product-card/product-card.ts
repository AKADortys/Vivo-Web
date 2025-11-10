import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product: Product | null = null;
}
