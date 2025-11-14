import { Component, Input, computed } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';

@Component({
  selector: 'app-product-card',
  imports: [FormatDatePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product: Product | null = null;
}
